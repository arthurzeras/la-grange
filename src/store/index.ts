import { reactive } from 'vue';
import { ReadableStreamDefaultReader } from 'stream/web';

type TState = {
  logs: {
    list: Record<string, string[]>;
    streams: Record<
      string,
      {
        willCancel?: boolean;
        stream: ReadableStream<Uint8Array>;
      }
    >;
  };
};

const state = reactive<TState>({
  logs: {
    list: {},
    streams: {},
  },
});

const mutations = {
  logs: {
    async newLogReader(name: string, stream: ReadableStream<Uint8Array>) {
      state.logs.streams[name] = { stream };

      const reader = stream.getReader();

      for await (const chunk of this.readLogsChunks(name, reader)) {
        const decoded = new TextDecoder().decode(chunk);
        this.addLogs(name, decoded);
      }
    },

    addLogs(name: string, logs: string) {
      const logsList = logs.split('\n');

      if (name in state.logs.list) {
        state.logs.list[name] = [...state.logs.list[name], ...logsList];
        return;
      }

      state.logs.list[name] = logsList;
    },

    readLogsChunks: (
      name: string,
      reader: ReadableStreamDefaultReader<Uint8Array>,
    ) => ({
      async *[Symbol.asyncIterator]() {
        let readResult = await reader.read();

        while (!readResult.done) {
          if (state.logs.streams[name].willCancel) {
            reader.cancel();
            delete state.logs.streams[name];
            return;
          }

          yield readResult.value;
          readResult = await reader.read();
        }
      },
    }),

    removeLog(name: string) {
      delete state.logs.list[name];
      state.logs.streams[name].willCancel = true;
    },
  },
};

export default {
  state,
  mutations,
};
