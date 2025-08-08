declare interface Pageable {
  content: any[];
  totalPages: number;
  pageSize: number;
  pageNumber: number;
  last: boolean;
  NumberOfTotalElements: number;
  NumberOfElements: number;
}

declare interface ComponentProps<T extends HTMLElement>
  extends React.CSSProperties,
    React.HTMLAttributes<T> {
  Ref?: Ref<T> | undefined;
}

interface DirectionalStyleInterface {
  padding?: string | number;
  paddingTop?: string | number;
  paddingRight?: string | number;
  paddingBottom?: string | number;
  paddingLeft?: string | number;
  margin?: string | number;
  marginTop?: string | number;
  marginRight?: string | number;
  marginBottom?: string | number;
  marginLeft?: string | number;
  border?: string | number;
  borderTop?: string | number;
  borderRight?: string | number;
  borderBottom?: string | number;
  borderLeft?: string | number;
}

type OSType = "ios" | "android" | "windows" | "macos" | "linux" | "unknown";

type DeviceType = "desktop" | "mobile" | "tablet" | "unknown";

// 데이터 선언용
interface BaseEntity {
  id: string;
  created_at: string | Date;
  updated_at: string | Date;
  deleted_at: string | Date | null;
}
interface UserDataFrame {
  username: string;
  birthday: string;
  metadata?: Record<string, unknown> | null;
}
interface UserData extends BaseEntity, UserDataFrame {
  adult?: boolean;
  role: "member" | "developer" | "admin" | "member";
}
interface StoreDataFrame {
  name: string;
  currency_unit: string;
  adult: boolean;
  thumbnail?: string;
  description?: string;
  metadata?: Record<string, unknown> | null;
  index?: number;
}
interface StoreData extends BaseEntity, StoreDataFrame {
  index: number;
  currency_unit: string;
}

interface BrandDataFrame {
  name: string;
  thumbnail?: string;
  description?: string;
  metadata?: Record<string, unknown> | null;
}
interface BrandData extends BaseEntity, BrandDataFrame {}

interface CategoryDataFrame {
  store_id: string;
  parent_id?: string | null;
  name: string;
  thumbnail?: string;
  metadata?: Record<string, unknown> | null;
  index: number;
}
interface CategoryData extends BaseEntity, CategoryDataFrame {
  parent?: CategoryData;
  children?: CategoryData[];
}

interface ProductDataFrame {
  store_id: string;
  brand_id: string;
  category_id: string;
  title: string;
  thumbnail?: string;
  description?: string;
  detail?: string;
  price?: number;
  tax_rate?: number;
  visible?: boolean;
  buyable?: boolean;
  adult?: boolean;
  tags?: string[];
  metadata?: Record<string, unknown> | null;
  variants: VariantDataFrame[];
  options?: OptionDataFrame[];
}
interface ProductData extends BaseEntity, ProductDataFrame {
  store: StoreData;
  brand: BrandData;
  category: CategoryData;
  variants: VariantData[];
  options: OptionData[];
}

interface VariantDataFrame {
  product_id?: string;
  title?: string;
  thumbnail?: string;
  extra_price: number;
  stack: number;
  visible: boolean;
  buyable: boolean;
  metadata?: Record<string, unknown> | null;
  values?: OptionValueDataFrame[];
}

interface VariantData extends BaseEntity, VariantDataFrame {
  product_id: string;
  price: number;
  index: number;
  product: ProductData;
  values: OptionValueData[];
}

interface OptionDataFrame {
  product_id?: String;
  title: string;
  metadata?: Record<string, unknown> | null;
  values?: OptionValueDataFrame[];
}

interface OptionData extends BaseEntity, OptionDataFrame {
  product_id: string;
  product: ProductData;
  values: OptionValueData[];
}

interface OptionValueDataFrame {
  option_id?: string;
  variant_id?: string;
  value: string;
  metadata?: Record<string, unknown> | null;
  variant?: VariantDataFrame;
  option?: OptionDataFrame;
}
interface OptionValueData extends BaseEntity, OptionValueDataFrame {
  option_id: string;
  variant_id: string;
  variant: VariantData;
  option: OptionData;
}
