<template>
<div>
  <div class="scoreBoard">
    <span>O победил {{ wins.O }} раз</span>
    <h2>Табло</h2>
    <span>X победил {{ wins.X }} раз</span>
  </div>
  <div id="app">
    <div id="details">
      <h1>Крестики-нолики</h1>
      <h2>Матч №{{ matches + 1 }}</h2>
    </div>
    <Grid></Grid>
    <button class="restart" @click="restart">Перезапуск</button>
  </div>
</div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      matches: 0,
      wins: {
        O: 0,
        X: 0
      }
    } 
  },
  methods: {
    restart () {
      Event.$emit('clearCell')
      Event.$emit('GridReset')
      this.matches++
    }
  },
  created () {
    Event.$on('win', winner => this.wins[winner]++)
    }
}
</script>

<style>
body {
  background-color: rgb(192, 182, 182);
  color: #fff;
  font-family: 'Dosis', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0px;
}

#app {
  margin: 0 auto;
  max-width: 350px;
  color: #202830;
}

h1 {
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2em;
}

.restart {
  background-color: #5523df;
  color: #fff;
  border: 0px;
  font-family: 'Dosis', sans-serif;
  font-size: 1.4em;
  font-weight: bold;
  margin: 0px;
  padding: 15px;
  width: 100%;
}

.restart:hover {
  background-color: #070707;
  cursor: pointer;
}

.scoreBoard {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 15px;
  background-color: #222726;
  box-shadow: 10px solid #fff;
  padding: 20px;
  overflow-x: none;
}

.scoreBoard h2 {
  margin: 0px;
}

.scoreBoard span {
    float: right;
    font-size: 1.5em;
    font-weight: bold;
    margin-left: 20px;
}
</style>
