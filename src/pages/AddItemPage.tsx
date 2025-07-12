
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ArrowLeft, Upload, X, Plus } from 'lucide-react';
import { addItem } from '../store/slices/itemsSlice';
import { ROUTES, ITEM_CATEGORIES, ITEM_CONDITIONS, SIZES } from '../config/constants';
import itemService from '../services/itemService';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

interface AddItemFormValues {
  title: string;
  description: string;
  category: string;
  size: string;
  condition: string;
  tags: string;
  points: number;
}

const AddItemPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, 'Title must be at least 3 characters')
      .max(100, 'Title must be less than 100 characters')
      .required('Title is required'),
    description: Yup.string()
      .min(10, 'Description must be at least 10 characters')
      .max(500, 'Description must be less than 500 characters')
      .required('Description is required'),
    category: Yup.string().required('Category is required'),
    size: Yup.string().required('Size is required'),
    condition: Yup.string().required('Condition is required'),
    points: Yup.number()
      .min(1, 'Points must be at least 1')
      .max(100, 'Points cannot exceed 100')
      .required('Points are required'),
    tags: Yup.string().required('At least one tag is required')
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImages(prev => [...prev, result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (values: AddItemFormValues) => {
    if (images.length === 0) {
      alert('Please upload at least one image');
      return;
    }

    setIsSubmitting(true);

    try {
      const tagsArray = values.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      const itemData = {
        ...values,
        tags: tagsArray,
        images: images
      };

      const newItem = await itemService.createItem(itemData);
      dispatch(addItem(newItem));
      
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      console.error('Failed to create item:', error);
      alert('Failed to create item. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground">
                Add New Item
              </CardTitle>
              <p className="text-muted-foreground">
                List your item for swapping with the community
              </p>
            </CardHeader>

            <CardContent>
              <Formik
                initialValues={{
                  title: '',
                  description: '',
                  category: '',
                  size: '',
                  condition: '',
                  tags: '',
                  points: 20
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, setFieldValue, touched, errors }) => (
                  <Form className="space-y-6">
                    {/* Image Upload */}
                    <div className="space-y-4">
                      <Label className="text-sm font-medium">Images *</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg border border-border"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                        <label className="w-full h-32 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                          <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                          <span className="text-sm text-muted-foreground">Add Image</span>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-sm font-medium">
                        {t('item.title')} *
                      </Label>
                      <Field
                        as={Input}
                        id="title"
                        name="title"
                        placeholder="Enter item title"
                        className={touched.title && errors.title ? 'border-red-500' : ''}
                      />
                      <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-sm font-medium">
                        {t('item.description')} *
                      </Label>
                      <Field
                        as={Textarea}
                        id="description"
                        name="description"
                        placeholder="Describe your item..."
                        rows={4}
                        className={touched.description && errors.description ? 'border-red-500' : ''}
                      />
                      <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                    </div>

                    {/* Category and Size */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">{t('item.category')} *</Label>
                        <Select onValueChange={(value) => setFieldValue('category', value)}>
                          <SelectTrigger className={touched.category && errors.category ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(ITEM_CATEGORIES).map(([key, value]) => (
                              <SelectItem key={value} value={value}>
                                {key.charAt(0) + key.slice(1).toLowerCase()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">{t('item.size')} *</Label>
                        <Select onValueChange={(value) => setFieldValue('size', value)}>
                          <SelectTrigger className={touched.size && errors.size ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(SIZES).map(([key, value]) => (
                              <SelectItem key={value} value={value}>
                                {key}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <ErrorMessage name="size" component="div" className="text-red-500 text-sm" />
                      </div>
                    </div>

                    {/* Condition and Points */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">{t('item.condition')} *</Label>
                        <Select onValueChange={(value) => setFieldValue('condition', value)}>
                          <SelectTrigger className={touched.condition && errors.condition ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(ITEM_CONDITIONS).map(([key, value]) => (
                              <SelectItem key={value} value={value}>
                                {key.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <ErrorMessage name="condition" component="div" className="text-red-500 text-sm" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="points" className="text-sm font-medium">
                          Points *
                        </Label>
                        <Field
                          as={Input}
                          id="points"
                          name="points"
                          type="number"
                          min="1"
                          max="100"
                          placeholder="20"
                          className={touched.points && errors.points ? 'border-red-500' : ''}
                        />
                        <ErrorMessage name="points" component="div" className="text-red-500 text-sm" />
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="space-y-2">
                      <Label htmlFor="tags" className="text-sm font-medium">
                        {t('item.tags')} *
                      </Label>
                      <Field
                        as={Input}
                        id="tags"
                        name="tags"
                        placeholder="casual, summer, cotton (comma separated)"
                        className={touched.tags && errors.tags ? 'border-red-500' : ''}
                      />
                      <p className="text-xs text-muted-foreground">
                        Enter tags separated by commas
                      </p>
                      <ErrorMessage name="tags" component="div" className="text-red-500 text-sm" />
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-4 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate(-1)}
                        className="flex-1"
                      >
                        {t('common.cancel')}
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      >
                        {isSubmitting ? t('common.loading') : t('common.submit')}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddItemPage;
