import { createClient } from './supabase/client';

export const supabase = createClient();

function mapError(err) {
  const msg = err.message || err.details || err.hint || String(err);
  const code = err.code || '';
  
  if (msg.includes('VERSION_CONFLICT')) {
    return new Error('تم تعديل هذا السجل من مستخدم آخر، أعد تحميل الصفحة');
  }
  if (msg.includes('BRANCH_HAS_ACTIVE_USERS')) {
    return new Error('لا يمكن حذف الفرع لوجود مستخدمين نشطين مرتبطين به');
  }
  if (msg.includes('UNAUTHORIZED') || code === '42501') {
    return new Error('ليس لديك الصلاحية لإجراء هذه العملية');
  }
  if (code === '23505') {
    return new Error('هذا الاسم أو الرمز موجود مسبقاً، يرجى اختيار اسم مختلف');
  }
  if (code === '23514') {
    return new Error('البيانات المدخلة غير صحيحة، يرجى مراجعة الحقول (مثال: السعر يجب أن يكون رقماً موجباً)');
  }
  if (msg === 'Failed to fetch' || err?.status === 502 || err?.status === 503) {
    return new Error('يوجد مشكلة في الاتصال بالخادم، يرجى التأكد من اتصالك بالإنترنت والمحاولة مجدداً');
  }
  
  return new Error('حدث خطأ غير متوقع: ' + msg);
}

export const api = {
  rpc: async (fnName, params) => {
    const { data, error } = await supabase.rpc(fnName, params);
    if (error) throw mapError(error);
    return data;
  },
  
  query: async (queryBuilder) => {
    const { data, error } = await queryBuilder;
    if (error) throw mapError(error);
    return data;
  }
};
