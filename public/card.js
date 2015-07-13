var app = angular.module("bingoCardApp", [])

app.controller("CardController", function($scope){

  $scope.board = [
    [ 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0 ],
    [ 0, 0, 1, 0, 0 ],
    [ 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0 ]
  ]

  $scope.cardRule = "line"

  $scope.clickSquare = function(squareRow, squareColumn) {
    $scope.board[squareRow][squareColumn] = 1

    switch($scope.cardRule) {
      case "line":
        straightLine()
      case "fullCard":
        full()
      case "corners":
        fourCorners()
      case "outline":
        Outlines()
      case "hashtag":
        hashTheTag()
    }
  }

  var hashTheTag = function(){
    var cols = _.reduce($scope.board, function(memory, row){
      return _.map(row, function(cell, index){
        if (memory[index] === 0) {
          return 0
        }
        return cell
      })
    }, [ 1, 1, 1, 1, 1 ])

     var row1 = _.every($scope.board[1], _.identity)
     var column1 = _.every($scope.board[3], _.identity)

     if(row1 && column1){
      $scope.winner = true
     }

  }
  var Outlines = function(){
     var cols = _.reduce($scope.board, function(memory, row){
      return _.map(row, function(cell, index){
        if (memory[index] === 0) {
          return 0
        }
        return cell
      })
    }, [ 1, 1, 1, 1, 1 ])

     var row1 = _.every($scope.board[0], _.identity)
     var column1 = _.every($scope.board[4], _.identity)

     if(row1 && column1){
      $scope.winner = true
     }
     

     
  }

  var fourCorners = function(){
     var fourthCorner = 1
      _.times(5, function(i){
    
      if (fourthCorner === 0) {
        return 0
      }
      fourthCorner = $scope.board[0][0] && $scope.board[0][4] && $scope.board[4][4] && $scope.board[4][0]
    })

      if(fourthCorner){
        $scope.winner = true
      }
  }
  
  var straightLine = function() {
    var cols = _.reduce($scope.board, function(memory, row){
      return _.map(row, function(cell, index){
        if (memory[index] === 0) {
          return 0
        }
        return cell
      })
    }, [ 1, 1, 1, 1, 1 ])

    var matchInColumns = _.some(cols)

    var matchInRows = _.some($scope.board, function(row){
      return _.every(row)
    })

    var leftDiagonalMatch = 1
    _.times(5, function(i){
      if (leftDiagonalMatch === 0) {
        return 0
      }
      leftDiagonalMatch = $scope.board[i][i]
    })

    var rightDiagonalMatch = 1
    _.times(5, function(i){

      if (rightDiagonalMatch === 0) {
        return 0
      }
      rightDiagonalMatch = $scope.board[i][4 - i]
    })

    var matchInDiagonal = (leftDiagonalMatch || rightDiagonalMatch)

    if (matchInColumns || matchInRows || matchInDiagonal) {
      $scope.winner = true
    }
  }

var full = function(){
    var cols = _.reduce($scope.board, function(memory, row){
      return _.map(row, function(cell, index){
        if (memory[index] === 0) {
          return 0
        }
        return cell
      })
    }, [ 1, 1, 1, 1, 1 ])

    var matchInColumns = _.every(cols)
    if (matchInColumns ) {
      $scope.winner = true
    }
  }


})