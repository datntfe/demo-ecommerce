export interface ChildrenCategoy {
  id: number;
  name: string;
  is_active: boolean;
  children_data: ChildrenCategoy[];
}

export interface CategoriesData {
  id: number;
  name: string;
  is_active: boolean;
  children_data: ChildrenCategoy[];
}

export interface IResponseAllCategories {
  status: boolean;
  message: string;
  data: CategoriesData[];
  totalRecord: number;
  totalPaging: number;
}
