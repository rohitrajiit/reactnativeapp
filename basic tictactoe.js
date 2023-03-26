import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Board = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');

  const handlePress = (index) => {
    if (board[index] || checkWinner(board)) return;
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const renderSquare = (index) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.square}
        onPress={() => handlePress(index)}>
        <Text style={styles.squareText}>{board[index]}</Text>
      </TouchableOpacity>
    );
  };

  const winner = checkWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${currentPlayer}`;

  return (
    <View>
      <Text style={styles.status}>{status}</Text>
      <View style={styles.board}>
        {board.map((_, index) => renderSquare(index))}
      </View>
    </View>
  );
};

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Board />
    </GestureHandlerRootView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 303,
    height: 303,
    borderWidth: 1,
    borderColor: '#000',
    padding: 1,
  },
  square: {
    width: 99,
    height: 99,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareText: {
    fontSize: 48,
  },
  status: {
    fontSize: 24,
    marginBottom: 16,
  },
});
