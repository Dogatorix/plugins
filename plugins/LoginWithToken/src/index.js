import { logger } from "@vendetta";
import { registerCommand } from "@vendetta/commands";
import { findByStoreName, findByProps } from "@vendetta/metro";

export default {
  meta: vendetta.plugin,
  onLoad: () => {
    logger.log("Loaded 'Login with Token' plugin.");
    try {
      [
        {
          name: "login",
          description: "Login with token",
          execute: async (args) => {
            const options = new Map(args.map((arg) => [a.name, a]));
            const token = options.get("token").value;
            findByProps(
              "login",
              "logout",
              "switchAccountToken"
            ).switchAccountToken(token);
          },
          options: [
            {
              type: 1,
              inputType: 1,
              applicationId: "-1",
              name: "token",
              description: "The token to login into",
              type: 3,
              required: true,
            },
          ],
        },
      ].forEach((command) => registerCommand(command));
    } catch (e) {
      console.error(e);
      alert("There was an error while loading 'Login with Token'\n" + e.stack);
    }
  },
  onUnload: () => {

  },
};
