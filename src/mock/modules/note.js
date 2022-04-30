const getList = {
    url: "/note/list",
    type: "get",
    response: () => {
        return {
            code: 200,
            data: {
                pagination: {
                    total: 50,
                    perPage: 10,
                    totalPage: 5,
                    currentPage: 4,
                },
                items: [
                    {
                        id: 1,
                        title: '笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记01',
                        created_at: '2022-04-16 15:06:20',
                    },
                    {
                        id: 2,
                        title: '笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记02',
                        created_at: '2022-04-16 15:06:20',
                    },
                    {
                        id: 3,
                        title: '笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记03',
                        created_at: '2022-04-16 15:06:20',
                    },
                    {
                        id: 4,
                        title: '笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记04',
                        created_at: '2022-04-16 15:06:20',
                    },
                    {
                        id: 5,
                        title: '笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记05',
                        created_at: '2022-04-16 15:06:20',
                    },
                    {
                        id: 1,
                        title: '笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记01',
                        created_at: '2022-04-16 15:06:20',
                    },
                    {
                        id: 2,
                        title: '笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记02',
                        created_at: '2022-04-16 15:06:20',
                    },
                    {
                        id: 3,
                        title: '笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记03',
                        created_at: '2022-04-16 15:06:20',
                    },
                    {
                        id: 4,
                        title: '笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记04',
                        created_at: '2022-04-16 15:06:20',
                    },
                    {
                        id: 5,
                        title: '笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记笔记05',
                        created_at: '2022-04-16 15:06:20',
                    },
                ]
            },
            msg: '获取成功'
        }
    }
}

const getDetail = {
    url: "/note/detail",
    type: "get",
    response: () => {
        var content = '';
        for (var i = 0; i <= 10; i++) {
            content += '<p>我在读书的时候有一个兄弟叫小楠，这人不喜欢讲话，做事非常有目的性，每次我们在一起聊天的时候，他总是能直入主题，然后做出一些总结性的结论，最后让我们不知道如何接下去。每次我们几个做出格的事情，他总是最理智的人；每次我们几个喝酒喝成狗的时候，他就是那个负责把我们送回去的人。</p>';
        }
        return {
            code: 200,
            data: {
                id: 1,
                title: '没有一条路是白走的',
                content: content,
                created_at: "2022-04-16 15:06:20",
            },
            msg: '获取成功'
        }
    }
}

module.exports = [
    getList,
    getDetail,
]