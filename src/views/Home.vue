<template>
  <div class="home">
    <ol id="dice">
      <li v-for="(member, key) in shuffledMembers" :key="key">
        <span></span>
        <strong>{{member}}</strong>
      </li>
    </ol>
    <div class="throw" v-on:click="shuffleMember">サイコロを振る</div>
    <textarea v-model="memberFrom" placeholder="名前を入力してください" @keyup="setMember" cols="12"></textarea>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data: function () {
    return {
      shuffledMembers:[],
      memberFrom:"★\n松本\n千原\n兵動\n原西\n宮川\n徳井\n綾部\n星野\nコバヤシ\n小藪"
    }
  },
  computed:{
    members: function () {
      const array = this.memberFrom.split(/\n/)
      var result = array.filter(function( item,index ) {
        if(item == "★"){
          if(index == 0){
            return true
          }else{
            return false
          }
        }
        return item != '';
      });
      return result
    }
  },
  methods: {
    setMember: function() {
      const array = []
      var i, j
      for(i = 0, j = 0 ; 12 > i; i++){
        if (this.members[j] == undefined){
          j = 1
        }
        array[i] = this.members[j]
        j++
      }
      this.shuffledMembers = array
      this.shuffledMembers.splice()
    },
    updateMember: function() {
      const array = []
      for(var i = 0; 12 > i; i++){
        var tmp =  this.members[Math.floor(Math.random() * this.members.length)]
        if(tmp == "★" && array.indexOf('★')>=0){
          i--
        }else{
          array[i] = tmp
        }
      }

      for(var i = array.length - 1; i > 0; i--){
        var r = Math.floor(Math.random() * (i + 1));
        var tmp = array[i];
        array[i] = array[r];
        array[r] = tmp;
      }

      this.shuffledMembers = array
      this.shuffledMembers.splice()
    },
    shuffleMember: function () {
      document.getElementById("dice").classList.remove("rolling")
      document.getElementById("dice").classList.add("rolling")
      setTimeout(this.updateMember, 1000);
      setTimeout(function(){document.getElementById("dice").classList.remove("rolling")}, 3000);
    }
  },
  mounted : function(){
    this.shuffledMembers = this.members
  }
}
</script>
<style lang="scss" scoped>
  .home{
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 100vw;
  }
  *{
    margin:0;
    padding:0;
  }
  textarea{
    height: 300px;
    width: 50%;
    margin: 0 auto;
    font-size: 20px;
  }
  .rolling{
    animation:kurukuru 3s;
    transform-origin:0 0 -100px;
  }

  .throw {
    width: 30%;
    margin: 50px auto;
    text-align: center;
    cursor: pointer;
    display: inline-block;
    padding: 1em 1em;
    text-decoration: none;
    font-weight: bold;
    border-radius: 4px;
    color: #ffc637;
    text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.5);
    background-image: linear-gradient(#b90000 0%, #a20000 100%);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.29);
    border-bottom: solid 3px #a0042d;
    font-size: 20px;

  }
  .throw:active {
    -webkit-transform: translateY(4px);
    transform: translateY(4px);
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2);
    border-bottom: none;
  }

  ol{
    list-style:none;
    margin:200px auto;
    width: 100px;
    position:relative;
    transform-style:preserve-3d;
    li{
      width:100px;
      height:100px;
      position:absolute;
      background:#333;
      transform:rotate3d(0,0,0,180deg);
      strong{
        font-size:30px;
        color:#fff;
        text-align:center;
        line-height:1.25;
        width:100%;
        position:absolute;
        z-index:1;
      }
      &:before,
      &:after{
        content:"";
        width:100%;
        height:100%;
        bottom:0;
        left:0;
        position:absolute;
        background:#333;
      }
      &:before{
        transform-origin:bottom right;
        transform:rotate(18deg);
      }
      &:after{
        transform-origin:bottom left;
        transform:rotate(-18deg);
      }
      span{
        &:before,
        &:after{
          content:"";
          width:100px;
          height:100px;
          position:absolute;
          background:#333;
        }
        &:before{
          transform-origin:top left;
          transform:rotate(-36deg) translate3d(-28px,-14px,0px);
        }
        &:after{
          transform-origin:top right;
          transform:rotate(36deg) translate3d(28px,-14px,0px);
        }
      }
      &:nth-child(2){
        transform-origin:bottom;
        transform:rotateX(116.5deg) rotateY(180deg);
      }
      &:nth-child(3){
        transform-origin:bottom;
        transform:rotateZ(72deg) translate3d(-66px,48px,0px) rotateX(116.5deg) rotateY(180deg);
      }
      &:nth-child(4){
        transform-origin:bottom;
        transform:rotateZ(144deg) translate3d(-41px,125px,0px) rotateX(116.5deg) rotateY(180deg);
      }
      &:nth-child(5){
        transform-origin:bottom;
        transform:rotateZ(216deg) translate3d(40px,125px,0px) rotateX(116.5deg) rotateY(180deg);
      }
      &:nth-child(6){
        transform-origin:bottom;
        transform:rotateZ(288deg) translate3d(65px,48px,0px) rotateX(116.5deg) rotateY(180deg);
      }
      &:nth-child(7){
        transform-origin:bottom;
        transform:rotateZ(36deg) translate3d(-40px,15px,-223px) rotateX(-116.5deg) rotateY(180deg);
      }
      &:nth-child(8){
        transform-origin:bottom;
        transform:rotateZ(108deg) translate3d(-65px,92px,-223px) rotateX(-116.5deg);
      }
      &:nth-child(9){
        transform-origin:bottom;
        transform:rotateZ(180deg) translate3d(0px,138px,-223px) rotateX(-116.5deg);
      }
      &:nth-child(10){
        transform-origin:bottom;
        transform:rotateZ(252deg) translate3d(65px,92px,-223px) rotateX(-116.5deg);
      }
      &:nth-child(11){
        transform-origin:bottom;
        transform:rotateZ(324deg) translate3d(40px,15px,-223px) rotateX(-116.5deg);
      }
      &:nth-child(12){
        transform-origin:bottom;
        transform:rotateZ(36deg) translate3d(-40px,15px,-223px);
      }
    }
  }

  @keyframes kurukuru{
    0% {
      transform:rotateX(0turn) rotateY(0turn) rotateZ(0turn);
    }
    100% {
      transform:rotateX(7turn) rotateY(1turn) rotateZ(0turn);
    }
  }
</style>