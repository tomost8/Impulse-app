import { useEffect, useRef, useState, useCallback } from 'react';

export function useWebSocket(userId: number) {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const subscriptionIdRef = useRef<string | null>(null);
  const handlersRef = useRef<Record<string, (payload: any) => void>>({});

  // Generate unique subscription ID
  const generateSubscriptionId = useCallback(() => {
    return Math.random().toString(36).substring(2, 15);
  }, []);

  // Connect WebSocket
  const connect = useCallback(() => {
    try {
      let retries = 0;
      console.log('Connecting to WebSocket...');
      wsRef.current = new WebSocket('http://10.0.2.2:3000/graphql', 'graphql-transport-ws');
      
      wsRef.current.onopen = () => {
        console.log('WebSocket connection opened');
        retries = 0;
        setIsConnected(true);
        
        // Send initialization message
        const initMessage = {
          type: 'connection_init',
          payload: {
            user: {
              id: userId
            }
          }
        };
        console.log('Sending initialization message:', JSON.stringify(initMessage));
        wsRef.current?.send(JSON.stringify(initMessage));
      };
      
      wsRef.current.onclose = (event) => {
        console.log(`WebSocket connection closed. Code: ${event.code}, Reason: ${event.reason}`);
        setIsConnected(false);
        subscriptionIdRef.current = null;
      };
      
      wsRef.current.onerror = (event) => {
        console.error('WebSocket error:', event);
        setError('WebSocket connection error');
        setIsConnected(false);
      };

      wsRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === 'next' && data.id) {
          handlersRef.current[data.id]?.(data.payload);
        }

        if (data.type === 'complete' && data.id) {
          delete handlersRef.current[data.id];
        }
      };
    } catch (error) {
      console.error('Error creating WebSocket:', error);
      setError(`Error creating WebSocket: ${error}`);
      setIsConnected(false);
    }
  }, [userId]);

  // Disconnect WebSocket
  const disconnect = useCallback(() => {
    if (wsRef.current) {
      unsubscribeFromMessages();
      wsRef.current.close();
      wsRef.current = null;
      setIsConnected(false);
    }
  }, []);

  // Subscribe to messages
  const subscribeToMessages = useCallback((onMessageReceived: (message: any) => void) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.log('WebSocket not connected, cannot subscribe to messages');
      return false;
    }

    // If already subscribed, unsubscribe first
    if (subscriptionIdRef.current) unsubscribeFromMessages();

    const id = generateSubscriptionId();
    subscriptionIdRef.current = id;
    console.log("useWebSocket subscribeMessage", subscriptionIdRef.current)

    handlersRef.current[id] = (payload) => {
      if (payload?.data?.messageSent) {
        onMessageReceived(payload.data.messageSent);
      }
    };

    const subscribeMessage = {
      id,
      type: 'subscribe',
      payload: {
        query: `subscription { messageSent { id chat_id sender_id content created_at } }`
      }
    };

    console.log('Subscribing to message updates...');
    console.log('Sending subscription message:', JSON.stringify(subscribeMessage));
    wsRef.current.send(JSON.stringify(subscribeMessage));

    return true;
  }, [generateSubscriptionId]);

  // Unsubscribe from messages
  const unsubscribeFromMessages = useCallback(() => {
    if (!wsRef.current || !subscriptionIdRef.current) {
      return;
    }

    const completeMessage = {
      id: subscriptionIdRef.current,
      type: 'complete'
    };
    console.log('Sending unsubscribe message:', JSON.stringify(completeMessage));
    wsRef.current.send(JSON.stringify(completeMessage));
    subscriptionIdRef.current = null;
  }, []);

  // Disconnect when component unmounts
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