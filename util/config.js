const env = process.env.NODE_ENV;
const isDev = (env === 'development');

// 服务器地址(流程设计器和下载链接都会用到)
const severURL = 'http://crm.test.ahyzyx.cn';

export default isDev ? {
    httpConfig: {
        baseURL: '/api',
        timeout: 20000,
        severURL,
    },
    websocketConfig: {
        connection: 'ws://crm.test.ahyzyx.cn/ws',
        format: 'json',
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 3000,
        connectManually: true
    },
    // 存储localStorage时设置前缀
    storePrefix: 'YZYX_CRM_'
} : {
    httpConfig: {
        baseURL: 'http://crm.test.ahyzyx.cn',
        timeout: 20000,
        severURL,
    },
    websocketConfig: {
        connection: 'ws://crm.test.ahyzyx.cn/ws',
        format: 'json',
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 3000,
        connectManually: true
    },
    // 存储localStorage时设置前缀
    storePrefix: 'YZYX_CRM_',
};
