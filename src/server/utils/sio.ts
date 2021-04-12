//----------------------------------------------------------------------------------------------------------------------
// Socket.IO Handler Utility
//----------------------------------------------------------------------------------------------------------------------

import { Server } from 'socket.io';

//----------------------------------------------------------------------------------------------------------------------

let sio : Server | undefined;

//----------------------------------------------------------------------------------------------------------------------

export interface RPGKEnvelope
{
    type : 'update' | 'remove' | 'event';
    resource ?: string;
    payload ?: Record<string, unknown>;
}

//----------------------------------------------------------------------------------------------------------------------

export async function setSIOInstance(sioServer : Server) : Promise<void>
{
    sio = sioServer;
}

export async function broadcast(namespace : string, message : RPGKEnvelope) : Promise<void>
{
    if(sio)
    {
        const ns = sio.of(namespace);
        ns.emit('message', message);
    }
}

//----------------------------------------------------------------------------------------------------------------------
