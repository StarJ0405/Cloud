interface ExcelReadableColumn {
  attr: string;
  code: string;
}
interface ExcelWritableColumn {
  text: string;
  wpx?: number;
  Cell?: ({ cell, row, index }) => any;
  code?: string;
  style?: {
    common?: any;
    col?: any;
    header?: any;
  };
}
interface ExcelSheet {
  name?: text;
  list?: any[];
  empty?: [];
  header?: ExcelWritableColumn[];
}

interface Pageable {
  content: any[];
  totalPages: number;
  pageSize: number;
  pageNumber: number;
  last: boolean;
  NumberOfTotalElements: number;
  NumberOfElements: number;
}

interface ComponentProps<T extends HTMLElement>
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
  password?: string;
  phone: string;
  thumbnail?: string;
  name: string;
  birthday: Date;
  metadata?: Record<string, unknown> | null;
}
interface UserData extends BaseEntity, UserDataFrame {
  role: "member" | "developer" | "admin" | "member";
}
