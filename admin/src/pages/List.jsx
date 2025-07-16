import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../config';
import { toast } from 'react-toastify';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableItem = ({ item, removeProduct }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 px-2 py-1 border text-sm'
    >
      <div {...listeners} className='cursor-move'>
        <img className='w-12' src={item.image[0]} alt='Product image' />
      </div>
      <p>{item.name}</p>
      <p>{item.category}</p>
      <p>
        {currency}
        {item.price}
      </p>
      <button
        onClick={() => removeProduct(item._id)}
        className='text-right md:text-center cursor-pointer text-lg  hover:text-red-end'
      >
        ×
      </button>
    </div>
  );
};

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        const sorted = response.data.products.sort(
          (a, b) => a.sortIndex - b.sortIndex
        );
        setList(sorted);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = list.findIndex((item) => item._id === active.id);
      const newIndex = list.findIndex((item) => item._id === over?.id);

      const newList = arrayMove(list, oldIndex, newIndex);
      setList(newList);

      try {
        const orderedIds = newList.map((item, index) => ({
          id: item._id,
          sortIndex: index,
        }));

        await axios.post(
          `${backendUrl}/api/product/reorder`,
          { products: orderedIds },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error('Reorder error:', error);
        toast.error('Failed to save new order');
      }
    }
  };

  return (
    <div>
      <p className='mb-2'>All Products List</p>

      <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center px-2 py-1 border bg-gray-100 text-sm'>
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b className='text-center'>Action</b>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={list.map((item) => item._id)}
          strategy={verticalListSortingStrategy}
        >
          <div className='flex flex-col gap-2'>
            {list.map((item) => (
              <SortableItem
                key={item._id}
                item={item}
                removeProduct={removeProduct}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default List;
