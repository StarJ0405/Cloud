export default function () {
  `
  CREATE OR REPLACE FUNCTION fn_text_to_char_array(p_text TEXT)
        RETURNS TEXT[]
        LANGUAGE sql
        IMMUTABLE
        AS $$
          SELECT string_to_array(LOWER(REPLACE(p_text, ' ', '')), NULL);
        $$;
  CREATE INDEX idx_user_id ON public.user USING GIN (fn_text_to_char_array(id));
  CREATE INDEX idx_user_username ON public.user USING GIN (fn_text_to_char_array(username));
  CREATE INDEX idx_user_name ON public.user USING GIN (fn_text_to_char_array(name));
  CREATE INDEX idx_user_nickname ON public.user USING GIN (fn_text_to_char_array(nickname));
  `;
}
