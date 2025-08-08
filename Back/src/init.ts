export default function () {
  `
  CREATE INDEX idx_brand_name ON public.brand USING GIN (fn_text_to_char_array(name));
  CREATE INDEX idx_category_name ON public.category USING GIN (fn_text_to_char_array(name));
  CREATE INDEX idx_store_name ON public.store USING GIN (fn_text_to_char_array(name));
  CREATE INDEX idx_product_title ON public.product USING GIN (fn_text_to_char_array(title));
  CREATE INDEX idx_varaint_title ON public.variant USING GIN (fn_text_to_char_array(title));
  `;
}
