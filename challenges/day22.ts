import { readFile } from "../helpers/file-reader";
import { sum } from "../helpers/math";

export function getGameScore(file: string): number {
  let decks = file
    .split('\n\n')
    .map(deck => {
      const [deckName, deckContent] = deck.split(':\n'); //?
      const cards = deckContent.split('\n').map(card => parseInt(card));
      return {
        deckName,
        cards
      }
    });

  while(decks[PLAYER_1].cards.length > 0 && decks[PLAYER_2].cards.length > 0) {
    const player1card = decks[PLAYER_1].cards.shift()!;
    const player2card = decks[PLAYER_2].cards.shift()!;

    if (player1card > player2card) {
      decks[PLAYER_1].cards.push(player1card);
      decks[PLAYER_1].cards.push(player2card);
    } else {
      decks[PLAYER_2].cards.push(player2card);
      decks[PLAYER_2].cards.push(player1card);
    }
  }

  const winningDeck = decks[PLAYER_1].cards.length > 0 ? decks[PLAYER_1].cards : decks[PLAYER_2].cards; //?

  const cardScores = winningDeck.reverse().map((card, index) => card * (index+1)); //?

  return sum(cardScores);
}

const PLAYER_1 = 0;
const PLAYER_2 = 1;

interface Decks {
  deck1: number[],
  deck2: number[]
}

const getRoundString = (deck1: number[], deck2: number[]) => {
  return JSON.stringify({
    deck1,
    deck2
  });
}

export function playGameRecursive(gameDecks: Decks): Decks {
  let localDeck1 = [...gameDecks.deck1];
  let localDeck2 = [...gameDecks.deck2];

  let rounds = new Set();

  while(localDeck1.length > 0 && localDeck2.length > 0) {
    const player1card = localDeck1.shift()!;
    const player2card = localDeck2.shift()!;

    const currentRoundString = getRoundString(localDeck1, localDeck2);
    const isRoundAlreadyPlayed = rounds.has(currentRoundString);

    if (isRoundAlreadyPlayed) {
      localDeck1 = [1];
      localDeck2 = [];
      break;
    }

    rounds.add(currentRoundString);

    const shouldRecurseGame = player1card < localDeck1.length && player2card < localDeck2.length;
    if (shouldRecurseGame) {
      const subDeck1 = localDeck1.slice(0, player1card);
      const subDeck2 = localDeck2.slice(0, player2card);

      const result = playGameRecursive({
        deck1: subDeck1,
        deck2: subDeck2
      });

      if (result.deck1.length > 0) {
        localDeck1.push(player1card);
        localDeck1.push(player2card);
      } else {
        localDeck2.push(player2card);
        localDeck2.push(player1card);
      }
    } else {
      if (player1card > player2card) {
        localDeck1.push(player1card);
        localDeck1.push(player2card);
      } else {
        localDeck2.push(player2card);
        localDeck2.push(player1card);
      }
    }
  }

  return {
    deck1: localDeck1,
    deck2: localDeck2
  }
}

export function getGameScoreRecursive(file: string): number {
  let decks = file
    .split('\n\n')
    .map(deck => {
      const [deckName, deckContent] = deck.split(':\n'); //?
      const cards = deckContent.split('\n').map(card => parseInt(card));
      return {
        deckName,
        cards
      }
    });

  const gameDecks = {
    deck1: decks[0].cards,
    deck2: decks[1].cards
  }
  
  const result = playGameRecursive(gameDecks);

  const winningDeck = result.deck1.length > 0 ? result.deck1 : result.deck2; //?

  const cardScores = winningDeck.reverse().map((card, index) => card * (index+1)); //?

  return sum(cardScores);
}