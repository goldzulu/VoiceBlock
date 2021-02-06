import { Room, Client } from "colyseus";
import { GameState } from "./schema/GameState"

export class VoiceBlockRoom extends Room {

  onCreate (options: any) {
    this.setState(new GameState());

    this.onMessage("type", (client, message) => {
      //
      // handle "type" message
      //
    });
  }

  onJoin (client: Client, options: any) {
  }

  onLeave (client: Client, consented: boolean) {
  }

  onDispose() {
  }

}
