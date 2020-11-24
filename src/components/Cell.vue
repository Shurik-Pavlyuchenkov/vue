<template>
    <td class="Cell" @click="strike">{{ mark }}</td>
</template>

<script>
export default {
    props: ['name'],
    data () {
        return {
            frozen: false,
            mark: ''
        }
    },
    methods: {
        strike () {
            if (!this.frozen) {
                this.mark = this.$parent.activePlayer
                this.frozen = true
                Event.$emit('strike', this.name)

                Event.$on('freeze', () => this.frozen = true)
            }
        }
    },
    created () {
        Event.$on('clearCell', () => {
            this.mark = '' 
            this.frozen = false
        })
    }
}
</script>

<style>
.Cell {
    width: 33.333%;
    height: 90px;
    border: 6px solid #2c3e50;
    font-size: 3.5em;
    font-family: 'Gochi Hand', sans-serif;
}

.Cell:hover {
    background-color: #7f8c8d;
}

.Cell::after {
    content: ' ';
    display: block;
}

.Cell:first-of-type {
    border-left-color: transparent;
    border-top-color: transparent;
}

.Cell:nth-of-type(2) {
    border-top-color: transparent;
}

.Cell:nth-of-type(3) {
    border-right-color: transparent;
    border-top-color: transparent;
}

tr:nth-of-type(3).cell {
    border-bottom-color: transparent;
}
</style>