import type { Document, Schema } from 'mongoose';
import { customAlphabet, urlAlphabet } from 'nanoid';

/**
 *  URL Alphabet 을 기반으로 랜덤한 id 를 생성하는 함수 generateId
 */
const generateId = (prefix: string) =>
    `${prefix}_${customAlphabet(urlAlphabet)()}`;

/**
 * Schema 에 nanoId 를 기반으로 생성된 unique Id 를 삽입하는 Plugin
 * @param schema Plugin 을 적용할 Schema
 * @param prefix unique Id 앞에 붙을 접두사
 */
export const mongooseUniqueIdPlugin = (schema: Schema, prefix = '') => {
    schema.add({
        id: {
            type: String,
            unique: true,
        },
    });

    // 1. save Query 의 경우 id 가 없으면 자동으로 추가한다.
    schema.pre('save', function (next) {
        if (!this.id) this.id = generateId(prefix);
        next();
    });

    // 2. insertMany Query 의 경우에도 id 가 없으면 자동으로 추가한다.
    schema.pre('insertMany', (next, docs: Document[]) => {
        docs.forEach((doc) => {
            if (!doc.id) doc.id = generateId(prefix);
        });
        next();
    });
};
