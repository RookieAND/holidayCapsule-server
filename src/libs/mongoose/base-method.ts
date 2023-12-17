import type {
    Document,
    FilterQuery,
    Model,
    ProjectionType,
    QueryOptions,
    Schema,
} from 'mongoose';

export type BaseMethodModel<T extends Document> = Model<T> & {
  findOne(): Promise<T | null>
  find(): Promise<T[] | null>
  findOneAndUpdate(): Promise<T>
}

/**
 * Schema 에 기본적인 Method 을 추가하여 적용하는 mongooseBaseMethodPlugin
 * @param schema Plugin 을 적용할 Schema
 */
export const mongooseBaseMethodPlugin = (schema: Schema) => {
    schema.add({
        id: {
            type: String,
            unique: true,
        },
    });

    type SchemaType = typeof schema;

    schema.methods.findOne = async function (
        query: FilterQuery<SchemaType>,
        projection?: ProjectionType<SchemaType>,
        option?: QueryOptions<SchemaType>,
    ) {
        this.findOne(query, projection, option).exec().lean();
    };

    schema.methods.find = async function (
        query: FilterQuery<SchemaType>,
        projection?: ProjectionType<SchemaType>,
        option?: QueryOptions<SchemaType>,
    ) {
        this.find(query, projection, option).exec().lean();
    };

    schema.methods.findOneAndUpdate = async function (
        query: FilterQuery<SchemaType>,
        projection?: ProjectionType<SchemaType>,
        option?: QueryOptions<SchemaType>,
    ) {
        this.findOneAndUpdate(query, projection, option).exec().lean();
    };
};
