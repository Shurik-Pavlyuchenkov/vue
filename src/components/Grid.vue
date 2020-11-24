<template>
<div>
    <div class="gameStatus" :class="gameStatusColor">
        {{ gameStatusMessage }}
    </div>
    <table class="Grid">
        <tr>
            <Cell name="1"></Cell>
            <Cell name="2"></Cell>
            <Cell name="3"></Cell>
        </tr>
        <tr>
            <Cell name="4"></Cell>
            <Cell name="5"></Cell>
            <Cell name="6"></Cell>
        </tr>
        <tr>
            <Cell name="7"></Cell>
            <Cell name="8"></Cell>
            <Cell name="9"></Cell>
        </tr>
    </table>
</div>
</template>

<script>
export default {
    data () {
        return {
            activePlayer: 'O',
            gameStatus: 'turn',
            gameStatusMessage: `O - ходит`,
            gameStatusColor: 'statusTurn',
            moves: 0,
            cells: {
                1: '' , 2: '' , 3: '' ,
                4: '' , 5: '' , 6: '' ,
                7: '' , 8: '' , 9: ''
            },
            winConditions: [
                [ 1, 2, 3], [ 4, 5, 6], [ 7, 8, 9],
                [ 1, 4, 7], [ 2, 5, 8], [ 3, 6, 9],
                [ 1, 5, 9], [ 3, 5, 7]
            ],
        }
    }, 
    methods: {
        changePlayer () {
            this.activePlayer = this.nonActivePlayer
            if (this.gameStatus === 'turn')
                this.gameStatusMessage = `${this.activePlayer} - ходит`
        },
        changeGameStatus () {
            if (this.checkForWin() ) {
                return this.gameIsWon()
            } else if (this.moves === 9) {
                return 'draw'
            }
            return 'turn'
        },
        checkForWin () {
            for (let i = 0; i < this.winConditions.length; i++) {
                let wc = this.winConditions[i]
                let cells = this.cells
                if (this.areEqual(cells[wc[0]], cells[wc[1]], cells[wc[2]])) {
                    return true
                }
            }
            return false
        },
        areEqual () {
            var len = arguments.length;
            for (var i = 1; i < len; i++) {
                if (arguments[i]==='' || arguments[i]!==arguments[i-1])
                    return false;
            }
            return true;
        },
        gameIsWon () {
            Event.$emit('win', this.activePlayer)
            this.gameStatusMessage = `${this.activePlayer} победил!`
            Event.$emit('freeze')
            return 'win'
        }
    },
    created () {
        Event.$on('strike', (cellNumber) => {
            this.cells[cellNumber] = this.activePlayer
            this.moves++
            this.gameStatus = this.changeGameStatus()
            this.changePlayer()
        })
        Event.$on('GridReset', () => {
            Object.assign(this.$data, this.$options.data())
        })
    },
    computed: {
        nonActivePlayer () {
            if (this.activePlayer === 'O') {
                return 'X'
            }
            return 'O'
        }
    },
    watch: {
        gameStatus: function() {
            if (this.gameStatus === 'win') {
                this.gameStatusColor = 'statusWin'
                this.gameStatusMessage = `${this.activePlayer()} победил!`
                return
            } else if (this.gameStatus === 'draw') {
                this.gameStatusColor = 'statusDraw'
                this.gameStatusMessage = 'Ничья'
                return
            } else {
                this.gameStatusMessage = `${this.activePlayer} - ходит`
            }
        }
    }
}
</script>

<style>
.Grid {
    background-color: #34495e;
    color: #fff;
    width: 100%;
    border-collapse: collapse;
}

.gameStatus {
    margin: 0px;
    padding: 15px;
    background-color: #0fcff1;
    color: #fff;
    font-size: 1.4em;
    font-weight: bold;
}

.statusTurn {
    background-color: #0fcff1;
}

.statusWin {
    background-color: #2edf1e;
}

.statusDraw {
    background-color: #c03184;
}
</style>