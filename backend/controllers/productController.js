import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';
import mongoose from 'mongoose';

// Validation for image
const validateImages = (files) => {
  const maxSize = 10 * 1024 * 1024;
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (file.size > maxSize) {
      throw new Error(`Image ${i + 1} size should be less than 10MB`);
    }

    if (!allowedTypes.includes(file.mimetype.toLowerCase())) {
      throw new Error(
        `Image ${i + 1}: Only JPEG, JPG, PNG and WebP images are allowed`
      );
    }
  }
};

// Validation for product data
const validateProductData = (productData) => {
  const {
    name,
    description,
    price,
    category,
    subName,
    conclusion,
    benefits,
    size,
  } = productData;

  if (!name || name.trim().length < 2) {
    throw new Error('Product name must be at least 2 characters');
  }

  if (!subName || subName.trim().length < 2) {
    throw new Error('Product subName must be at least 2 characters');
  }

  if (!description || description.trim().length < 10) {
    throw new Error('Description must be at least 10 characters');
  }

  if (!conclusion || conclusion.trim().length < 10) {
    throw new Error('Conclusion must be at least 10 characters');
  }

  if (!price || price <= 0) {
    throw new Error('Price must be greater than 0');
  }

  if (!category || category.trim().length === 0) {
    throw new Error('Category is required');
  }

  if (!benefits || !Array.isArray(benefits) || benefits.length === 0) {
    throw new Error('At least one benefit is required');
  }

  if (benefits.length > 10) {
    throw new Error('Maximum 10 benefits are allowed');
  }

  // Check if all benefits are non-empty strings
  const invalidBenefits = benefits.filter(
    (benefit) => !benefit || benefit.trim().length === 0
  );
  if (invalidBenefits.length > 0) {
    throw new Error('All benefits must be non-empty strings');
  }

  if (!size || size.trim().length === 0) {
    throw new Error('Size is required');
  }
};

//function for add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      subName,
      description,
      keyBenefits,
      benefits,
      conclusion,
      price,
      category,
      subCategory,
      size,
      bestseller,
    } = req.body;

    // Validation for required fields based on schema
    if (
      !name ||
      !subName ||
      !description ||
      !conclusion ||
      !price ||
      !category ||
      !subCategory ||
      !size
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Name, subName, description, conclusion, price, category, subCategory and size are required',
      });
    }

    const image1 = req.files.image1?.[0];
    const image2 = req.files.image2?.[0];
    const image3 = req.files.image3?.[0];
    const image4 = req.files.image4?.[0];
    const image5 = req.files.image5?.[0];

    const images = [image1, image2, image3, image4, image5].filter(Boolean);

    if (images.length !== 5) {
      return res.status(400).json({
        success: false,
        message: 'Exactly 5 images are required (1 main + 4 thumbnails)',
      });
    }

    // Validation for image
    try {
      validateImages(images);
    } catch (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError.message,
      });
    }

    // Uploading images to Cloudinary
    let imagesUrl = [];
    try {
      imagesUrl = await Promise.all(
        images.map(async (item) => {
          const result = await cloudinary.uploader.upload(item.path, {
            resource_type: 'image',
            transformation: [
              { width: 800, height: 800, crop: 'limit' },
              { quality: 'auto' },
            ],
          });
          return result.secure_url;
        })
      );
    } catch (cloudinaryError) {
      console.error('Cloudinary upload error:', cloudinaryError);
      return res.status(500).json({
        success: false,
        message: 'Failed to upload images',
      });
    }

    // Process benefits properly
    let processedBenefits = [];
    if (typeof benefits === 'string') {
      // If benefits is a string, split by newlines or commas
      processedBenefits = benefits
        .split(/[\n,]/)
        .map((b) => b.trim())
        .filter((b) => b.length > 0);
    } else if (Array.isArray(benefits)) {
      processedBenefits = benefits
        .map((b) => String(b).trim())
        .filter((b) => b.length > 0);
    }

    // Process sizes properly
    let processedSize = '';
    if (typeof size === 'string') {
      processedSize = size.trim();
    } else if (size) {
      processedSize = String(size).trim();
    }

    // Check if size is provided (required by schema)
    if (!processedSize) {
      return res.status(400).json({
        success: false,
        message: 'Size is required',
      });
    }

    const productData = {
      name: name.trim(),
      subName: subName.trim(),
      description: description.trim(),
      keyBenefits: keyBenefits ? keyBenefits.trim() : undefined,
      benefits: processedBenefits,
      conclusion: conclusion.trim(),
      price: Number(price),
      image: imagesUrl,
      category: category.trim(),
      subCategory: subCategory.trim(),
      size: processedSize,
      bestseller: bestseller === 'true' || bestseller === true,
      date: Date.now(),
    };

    // Validation for product data
    try {
      validateProductData(productData);
    } catch (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError.message,
      });
    }

    const count = await productModel.countDocuments();

    const product = new productModel({
      ...productData,
      sortIndex: count,
    });
    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product added successfully',
      productId: product._id,
    });
  } catch (error) {
    console.error('Add product error:', error);

    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json({
        success: false,
        message: 'Validation error: ' + validationErrors.join(', '),
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to add product: ' + error.message,
    });
  }
};

//function for list products
const listProducts = async (req, res) => {
  try {
    const { category, limit, page = 1, isActive } = req.query;

    // Create a filter
    const filter = {};
    if (category && category !== 'all') {
      filter.category = category;
    }

    // Filter by active status
    if (isActive !== undefined) {
      filter.isActive = isActive === 'true';
    }

    // Pagination
    const pageSize = limit ? parseInt(limit) : null;
    const skip = pageSize ? (parseInt(page) - 1) * pageSize : 0;

    // Validate page and limit values
    if (pageSize && (pageSize < 1 || pageSize > 100)) {
      return res.status(400).json({
        success: false,
        message: 'Limit must be between 1 and 100',
      });
    }

    if (parseInt(page) < 1) {
      return res.status(400).json({
        success: false,
        message: 'Page must be greater than 0',
      });
    }

    let query = productModel.find(filter).sort({ sortIndex: 1 });

    if (pageSize) {
      query = query.skip(skip).limit(pageSize);
    }

    const products = await query;
    const total = await productModel.countDocuments(filter);

    res.json({
      success: true,
      products,
      pagination: pageSize
        ? {
            page: parseInt(page),
            pageSize,
            total,
            pages: Math.ceil(total / pageSize),
          }
        : null,
    });
  } catch (error) {
    console.error('List products error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products: ' + error.message,
    });
  }
};

//function for removing product
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;

    // Validation ID
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required',
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format',
      });
    }

    // Checking whether the product exists
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Remove images from Cloudinary
    if (product.image && product.image.length > 0) {
      try {
        const deletePromises = product.image.map((imageUrl) => {
          // Extract public_id from Cloudinary URL
          const urlParts = imageUrl.split('/');
          const publicIdWithExtension = urlParts[urlParts.length - 1];
          const publicId = publicIdWithExtension.split('.')[0];
          return cloudinary.uploader.destroy(publicId);
        });
        await Promise.all(deletePromises);
      } catch (cloudinaryError) {
        console.warn(
          'Failed to delete images from Cloudinary:',
          cloudinaryError
        );
      }
    }

    await productModel.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Product removed successfully',
    });
  } catch (error) {
    console.error('Remove product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove product: ' + error.message,
    });
  }
};

//function for single product info
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    // Validation ID
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required',
      });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format',
      });
    }

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error('Single product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product: ' + error.message,
    });
  }
};

// Function for updating product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Validation ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format',
      });
    }

    // Check if product exists
    const existingProduct = await productModel.findById(id);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Process benefits if provided
    if (updateData.benefits) {
      if (typeof updateData.benefits === 'string') {
        updateData.benefits = updateData.benefits
          .split(/[\n,]/)
          .map((b) => b.trim())
          .filter((b) => b.length > 0);
      }
    }

    // Process sizes if provided
    if (updateData.size) {
      if (typeof updateData.size === 'string') {
        updateData.size = updateData.size.trim();
      } else {
        updateData.size = String(updateData.size).trim();
      }
    }

    // Update the product
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
    console.error('Update product error:', error);

    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json({
        success: false,
        message: 'Validation error: ' + validationErrors.join(', '),
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update product: ' + error.message,
    });
  }
};

const reorderProducts = async (req, res) => {
  try {
    const { products } = req.body;

    if (!Array.isArray(products)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid data format',
      });
    }

    const updates = products.map((p) =>
      productModel.findByIdAndUpdate(p.id, { sortIndex: p.sortIndex })
    );

    await Promise.all(updates);

    res.json({ success: true, message: 'Product order updated successfully' });
  } catch (error) {
    console.error('Reorder error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reorder products',
    });
  }
};

export {
  listProducts,
  addProduct,
  removeProduct,
  singleProduct,
  updateProduct,
  reorderProducts,
};
