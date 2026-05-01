'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function getVacancies() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { data: [
      { id: 'mock-v1', title: 'Майстер шиномонтажу', description: 'Досвід від 1 року. ЗП відсоток. Сучасне обладнання.', salary: '30 000 - 60 000 грн', active: true }
    ], error: null };
  }

  const { data, error } = await supabase
    .from('vacancies')
    .select('*')
    .order('created_at', { ascending: false });

  return { data: data || [], error };
}

export async function getActiveVacancies() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { data: [
      { id: 'mock-v1', title: 'Майстер шиномонтажу', description: 'Досвід від 1 року. ЗП відсоток.', salary: '30 000 - 60 000 грн', active: true }
    ], error: null };
  }

  const { data, error } = await supabase
    .from('vacancies')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: false });

  return { data: data || [], error };
}

export async function addVacancy(formData: { title: string; description: string; salary: string }, pwd: string) {
  if (pwd !== process.env.ADMIN_PASSWORD && process.env.NEXT_PUBLIC_SUPABASE_URL) return { success: false, error: 'Невірний пароль' };
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return { success: true };

  const { error } = await supabase.from('vacancies').insert([
    {
      title: formData.title,
      description: formData.description,
      salary: formData.salary,
      active: true,
    }
  ]);

  if (error) return { success: false, error: 'Помилка збереження' };
  
  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}

export async function toggleVacancyStatus(id: string, currentStatus: boolean, pwd: string) {
  if (pwd !== process.env.ADMIN_PASSWORD && process.env.NEXT_PUBLIC_SUPABASE_URL) return { success: false, error: 'Невірний пароль' };
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return { success: true };

  const { error } = await supabase.from('vacancies')
    .update({ active: !currentStatus })
    .eq('id', id);

  if (error) return { success: false, error: 'Помилка оновлення' };
  
  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}
