import { supabase } from '../../lib/supabase';

export interface SiteImage {
  id: string;
  section_name: string;
  image_url: string;
  image_title: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export async function getProductImages(): Promise<SiteImage[]> {
  const { data, error } = await supabase
    .from('site_images')
    .select('*')
    .eq('section_name', 'produtos')
    .eq('is_active', true)
    .order('display_order');

  if (error) throw error;
  return data || [];
}

export async function updateProductImage(
  imageId: string,
  file: File,
  adminEmail: string
): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${imageId}_${Date.now()}.${fileExt}`;
  const filePath = `products/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('site-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from('site-images')
    .getPublicUrl(filePath);

  const { data: oldImage } = await supabase
    .from('site_images')
    .select('image_url')
    .eq('id', imageId)
    .single();

  const { error: updateError } = await supabase
    .from('site_images')
    .update({
      image_url: publicUrl,
      updated_at: new Date().toISOString()
    })
    .eq('id', imageId);

  if (updateError) throw updateError;

  await supabase
    .from('image_change_log')
    .insert({
      admin_email: adminEmail,
      section_name: 'produtos',
      old_image_url: oldImage?.image_url,
      new_image_url: publicUrl,
      changed_at: new Date().toISOString()
    });

  return publicUrl;
}

export async function getImageChangeLogs() {
  const { data, error } = await supabase
    .from('image_change_log')
    .select('*')
    .order('changed_at', { ascending: false })
    .limit(50);

  if (error) throw error;
  return data || [];
}
