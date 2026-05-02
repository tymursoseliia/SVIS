'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function verifyAdminPassword(pwd: string) {
  // If no Supabase URL, fallback to local env
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return pwd === (process.env.ADMIN_PASSWORD || 'svis2026');
  }

  const { data, error } = await supabase
    .from('site_settings')
    .select('value')
    .eq('id', 'admin_password')
    .single();

  if (error || !data) {
    // Fallback if table doesn't exist or error
    return pwd === (process.env.ADMIN_PASSWORD || 'svis2026');
  }

  return pwd === data.value;
}

export async function getSiteSettings(id: 'prices' | 'sections') {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { data: {}, error: null };
  }

  const { data, error } = await supabase
    .from('site_settings')
    .select('value')
    .eq('id', id)
    .single();

  if (error) {
    return { data: {}, error: null }; // Return empty object if not found
  }

  return { data: data.value, error: null };
}

export async function updateSiteSettings(id: 'prices' | 'sections' | 'admin_password', value: any, pwd: string) {
  const isAuth = await verifyAdminPassword(pwd);
  if (!isAuth) {
    return { success: false, error: 'Невірний пароль' };
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { success: false, error: 'Supabase не налаштовано' };
  }

  const { error } = await supabase
    .from('site_settings')
    .update({ value })
    .eq('id', id);

  if (error) {
    console.error('Update settings error:', error);
    return { success: false, error: 'Помилка збереження налаштувань' };
  }

  // Revalidate entire site to apply changes
  revalidatePath('/', 'layout');
  
  return { success: true };
}
