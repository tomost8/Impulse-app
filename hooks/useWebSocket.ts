import { useEffect, useRef, useState, useCallback } from 'react';

export function useWebSocket(userId: number) {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const subscriptionIdRef = useRef<string | null>(null);

  // 生成唯一的订阅ID
  const generateSubscriptionId = useCallback(() => {
    return Math.random().toString(36).substring(2, 15);
  }, []);

  // 连接WebSocket
  const connect = useCallback(() => {
    try {
      console.log('正在连接WebSocket...');
      wsRef.current = new WebSocket('ws://18.191.234.29:3000/graphql', 'graphql-transport-ws');
      
      wsRef.current.onopen = () => {
        console.log('WebSocket连接已打开');
        setIsConnected(true);
        
        // 发送初始化消息
        const initMessage = {
          type: 'connection_init',
          payload: {
            user: {
              id: userId
            }
          }
        };
        console.log('发送初始化消息:', JSON.stringify(initMessage));
        wsRef.current?.send(JSON.stringify(initMessage));
      };
      
      wsRef.current.onclose = (event) => {
        console.log(`WebSocket连接已关闭。代码: ${event.code}, 原因: ${event.reason}`);
        setIsConnected(false);
        subscriptionIdRef.current = null;
      };
      
      wsRef.current.onerror = (event) => {
        console.error('WebSocket错误:', event);
        setError('WebSocket连接错误');
        setIsConnected(false);
      };
    } catch (error) {
      console.error('创建WebSocket时出错:', error);
      setError(`创建WebSocket时出错: ${error}`);
      setIsConnected(false);
    }
  }, [userId]);

  // 断开WebSocket连接
  const disconnect = useCallback(() => {
    if (wsRef.current) {
      unsubscribeFromMessages();
      wsRef.current.close();
      wsRef.current = null;
      setIsConnected(false);
    }
  }, []);

  // 订阅消息
  const subscribeToMessages = useCallback((onMessageReceived: (message: any) => void) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.log('WebSocket未连接，无法订阅消息');
      return false;
    }

    // 如果已经有订阅，先取消
    if (subscriptionIdRef.current) {
      unsubscribeFromMessages();
    }

    subscriptionIdRef.current = generateSubscriptionId();
    const subscribeMessage = {
      id: subscriptionIdRef.current,
      type: 'subscribe',
      payload: {
        query: `
          subscription {
            messageSent {
              id
              chat_id
              sender_id
              content
              created_at
            }
          }
        `
      }
    };

    console.log('订阅消息更新...');
    console.log('发送订阅消息:', JSON.stringify(subscribeMessage));
    wsRef.current.send(JSON.stringify(subscribeMessage));

    // 设置消息处理函数
    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('收到WebSocket消息:', data);
      
      if (data.type === 'next' && data.payload?.data?.messageSent) {
        const message = data.payload.data.messageSent;
        onMessageReceived(message);
      }
    };

    return true;
  }, [generateSubscriptionId]);

  // 取消订阅消息
  const unsubscribeFromMessages = useCallback(() => {
    if (!wsRef.current || !subscriptionIdRef.current) {
      return;
    }

    const completeMessage = {
      id: subscriptionIdRef.current,
      type: 'complete'
    };
    console.log('发送取消订阅消息:', JSON.stringify(completeMessage));
    wsRef.current.send(JSON.stringify(completeMessage));
    subscriptionIdRef.current = null;
  }, []);

  // 组件卸载时断开连接
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    isConnected,
    error,
    connect,
    disconnect,
    subscribeToMessages,
    unsubscribeFromMessages
  };
} 