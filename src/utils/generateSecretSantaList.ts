import { shuffle } from "lodash";

export type SecretSantaResult = {
  giver: string;
  receiver: string;
}[];

export const generateSecretSantaList = (players: string[]) => {
  const shuffledPlayers = shuffle(players);
  return shuffledPlayers.reduce(
    (acc: SecretSantaResult, giver, index) => [
      ...acc,
      {
        giver,
        receiver:
          index === shuffledPlayers.length - 1
            ? shuffledPlayers[0]
            : shuffledPlayers[index + 1],
      },
    ],
    []
  );
};
