import { AIOpts } from './ai-opts.interface'
import { ListenerOpts } from './listener-opts.interface'

export interface GameserverOpts {
    listener: ListenerOpts
    ai: AIOpts
}
