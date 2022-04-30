// http://www.mongoosejs.net/docs/api.html
'use strict';
import mongoose from 'mongoose';
const schema = mongoose.Schema;
try {
    // 'mongodb://admin:123456@127.0.0.1:27017/std?authSource=admin'
    mongoose.connect('mongodb://127.0.0.1:30001/flask');
} catch(err) {
    console.log(err)
}

const noteSchema = new schema({
    note_id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    created_at: {
        type: Number,
        required: true
    },
    updated_at: {
        type: Number
    }
})

const Note = mongoose.model('Note', noteSchema, 'notes');

const paginate = async (params, page_size, page) => {
    const keyword = params.keyword || '';
    let where = {};
    if(keyword.length > 0) {
        // 多条件示例
        // {
        //     $or : [
        //         {nick : {$regex : reg}},
        //         {email : {$regex : reg}}
        //     ]
        // }
        where = {title: {$regex : new RegExp(keyword, 'i')}};
    }

    const total = await Note.where(where).count();

    const doc = await Note.find(where, {_id:0,content:0}, {sort: {created_at: -1}}).skip((page -1) * page_size).limit(page_size);
    const data = {
        items: doc,
        pagination: {
            total: total,
            currentPage: page,
            perPage: page_size,
            totalPage: Math.ceil(total/page_size)
        }
    }
    return data;
}

const findOne = async (id) => {
    return await Note.findOne({note_id: id}, {_id:0});
}
const createOne = async (data) => {
    data.note_id = generate_note_id();
    data.created_at = generate_timestamp();
    data.updated_at = generate_timestamp();
    await Note.create(data)
}
const updateOne = async (id, data) => {
    const doc = await Note.findOne({note_id: id}, {_id:0});
    if(doc) {
        data.note_id = doc.note_id;
        data.updated_at = generate_timestamp();
        return await Note.updateOne({note_id: id}, data);
    }
    return false;
}
const deleteOne = async (id) => {
    return await Note.findOneAndRemove({note_id: id}, {_id:0});
}

const generate_note_id = () => {
    return Date.now();
}

const generate_timestamp = () => {
    return Date.now();
}

export default {
    paginate,
    findOne,
    createOne,
    updateOne,
    deleteOne,
}
