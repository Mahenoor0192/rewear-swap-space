import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Upload, X, ArrowLeft, Plus } from 'lucide-react';
import { addItem } from '../store/slices/itemsSlice';
import { ROUTES } from '../config/constants';
import itemService, { CreateItemData } from '../services/itemService';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';

const AddItemPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, 'Title must be at least 3 characters')
      .required('Title is required'),
    description: Yup.string()
      .min(10, 'Description must be at least 10 characters')
      .required('Description is required'),
    category: Yup.string().required('Category is required'),
    size: Yup.string().required('Size is required'),
    condition: Yup.string().required('Condition is required'),
    tags: Yup.array().min(1, 'At least one tag is required')
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      category: '',
      size: '',
      condition: '',
      tags: [] as string[]
    },
    validationSchema,
    onSubmit: async (values) => {
      if (selectedImages.length === 0) {
        toast.error('Please add at least one image');
        return;
      }

      setIsLoading(true);
      try {
        // Calculate points based on condition
        const conditionMultiplier = {
          new: 1.5,
          like_new: 1.3,
          good: 1.0,
          fair: 0.8
        };
        const basePoints = 20;
        const points = Math.round(basePoints * conditionMultiplier[values.condition as keyof typeof conditionMultiplier]);

        const itemData: CreateItemData = {
          ...values,
          images: selectedImages,
          points
        };

        const newItem = await itemService.createItem(itemData);
        dispatch(addItem(newItem));
        toast.success('Item listed successfully!');
        navigate(ROUTES.DASHBOARD);
      } catch (error: any) {
        console.error('Failed to create item:', error);
        toast.error(error.response?.data?.message || 'Failed to create item');
      } finally {
        setIsLoading(false);
      }
    }
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles: File[] = [];
      const newPreviews: string[] = [];
      
      for (let i = 0; i < Math.min(files.length, 5 - selectedImages.length); i++) {
        const file = files[i];
        newFiles.push(file);
        const imageUrl = URL.createObjectURL(file);
        newPreviews.push(imageUrl);
      }
      
      setSelectedImages([...selectedImages, ...newFiles]);
      setImagePreview([...imagePreview, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    const newPreviews = imagePreview.filter((_, i) => i !== index);
    
    // Revoke the URL to prevent memory leaks
    URL.revokeObjectURL(imagePreview[index]);
    
    setSelectedImages(newImages);
    setImagePreview(newPreviews);
  };

  const addTag = () => {
    if (tagInput.trim() && !formik.values.tags.includes(tagInput.trim())) {
      const newTags = [...formik.values.tags, tagInput.trim()];
      formik.setFieldValue('tags', newTags);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = formik.values.tags.filter(tag => tag !== tagToRemove);
    formik.setFieldValue('tags', newTags);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Add New Item
              </h1>
              <p className="text-muted-foreground">
                List your item for others to discover
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Item Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                {/* Images Upload */}
                <div className="space-y-2">
                  <Label>Images (Max 5) *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {imagePreview.map((image, index) => (
                      <div key={index} className="relative aspect-square">
                        <img
                          src={image}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 w-6 h-6 p-0"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                    {selectedImages.length < 5 && (
                      <label className="aspect-square border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center cursor-pointer hover:border-muted-foreground/50 transition-colors">
                        <div className="text-center">
                          <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Add Image</p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                    )}
                  </div>
                  {selectedImages.length === 0 && (
                    <p className="text-sm text-red-500">At least one image is required</p>
                  )}
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter item title"
                    {...formik.getFieldProps('title')}
                    className={formik.touched.title && formik.errors.title ? 'border-red-500' : ''}
                  />
                  {formik.touched.title && formik.errors.title && (
                    <p className="text-sm text-red-500">{formik.errors.title}</p>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your item in detail"
                    rows={4}
                    {...formik.getFieldProps('description')}
                    className={formik.touched.description && formik.errors.description ? 'border-red-500' : ''}
                  />
                  {formik.touched.description && formik.errors.description && (
                    <p className="text-sm text-red-500">{formik.errors.description}</p>
                  )}
                </div>

                {/* Category and Size */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select
                      value={formik.values.category}
                      onValueChange={(value) => formik.setFieldValue('category', value)}
                    >
                      <SelectTrigger className={formik.touched.category && formik.errors.category ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tops">Tops</SelectItem>
                        <SelectItem value="bottoms">Bottoms</SelectItem>
                        <SelectItem value="dresses">Dresses</SelectItem>
                        <SelectItem value="outerwear">Outerwear</SelectItem>
                        <SelectItem value="shoes">Shoes</SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                      </SelectContent>
                    </Select>
                    {formik.touched.category && formik.errors.category && (
                      <p className="text-sm text-red-500">{formik.errors.category}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Size *</Label>
                    <Select
                      value={formik.values.size}
                      onValueChange={(value) => formik.setFieldValue('size', value)}
                    >
                      <SelectTrigger className={formik.touched.size && formik.errors.size ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="xs">XS</SelectItem>
                        <SelectItem value="s">S</SelectItem>
                        <SelectItem value="m">M</SelectItem>
                        <SelectItem value="l">L</SelectItem>
                        <SelectItem value="xl">XL</SelectItem>
                        <SelectItem value="xxl">XXL</SelectItem>
                      </SelectContent>
                    </Select>
                    {formik.touched.size && formik.errors.size && (
                      <p className="text-sm text-red-500">{formik.errors.size}</p>
                    )}
                  </div>
                </div>

                {/* Condition */}
                <div className="space-y-2">
                  <Label>Condition *</Label>
                  <Select
                    value={formik.values.condition}
                    onValueChange={(value) => formik.setFieldValue('condition', value)}
                  >
                    <SelectTrigger className={formik.touched.condition && formik.errors.condition ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New with tags</SelectItem>
                      <SelectItem value="like_new">Like new</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                    </SelectContent>
                  </Select>
                  {formik.touched.condition && formik.errors.condition && (
                    <p className="text-sm text-red-500">{formik.errors.condition}</p>
                  )}
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label>Tags *</Label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add tags (e.g., vintage, casual)"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addTag}
                      disabled={!tagInput.trim()}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {formik.values.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formik.values.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="cursor-pointer"
                          onClick={() => removeTag(tag)}
                        >
                          {tag}
                          <X className="h-3 w-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  )}
                  {formik.touched.tags && formik.errors.tags && (
                    <p className="text-sm text-red-500">{formik.errors.tags}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex space-x-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    disabled={isLoading || selectedImages.length === 0}
                  >
                    {isLoading ? 'Listing Item...' : 'List Item'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddItemPage;
