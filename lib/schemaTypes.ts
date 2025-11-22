export type Column = {
  name: string;
  dataType: string;
  isNullable: boolean;
  isPrimaryKey: boolean;
};

export type Table = {
  name: string;
  columns: Column[];
};

export type Relation = {
  sourceTable: string;
  sourceColumn: string;
  targetTable: string;
  targetColumn: string;
};

export type SchemaResponse = {
  tables: Table[];
  relations: Relation[];
  message: string
};
