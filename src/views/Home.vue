<template>
  <div class="home">
    <h1><span>例</span><span>の</span><span>サ</span><span>イ</span><span>コ</span><span>ロ</span></h1>
    <div class="hole">
      <ol id="dice" class="idoling">
        <li v-for="(member, key) in shuffledMembers" :key="key">
          <span></span>
          <p class="name">{{member}}</p>
        </li>
      </ol>
    </div>
    <button class="throw" v-on:click="shuffleMember" v-bind:disabled="isPush">サイコロを振る</button>
    <p class="description">メンバーの名前を入力してください。</p>
    <textarea v-model="memberFrom" placeholder="名前を入力してください" @keyup="setMember" cols="12"></textarea>
    <p class="footer_txt">
      <small>サイコロは12面ですが、振る度に面も変わるので何名様でもお使いいただけます。<br>
      サイコロのデータは<a href="https://www.indetail.co.jp/blog/180824/" target="_blank">こちら</a>を参考にさせていただきました。<br>
      <a href="https://twitter.com/pizzayama_" target="_blank">お問い合わせ</a>
      </small>
    </p>
    <div class="tweet">
      <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-show-count="false">Tweet</a>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data: function () {
    return {
      shuffledMembers:[],
      memberFrom:"★\n松本\n千原\n兵動\n原西\n宮川\n徳井\n綾部\n星野\nコバヤシ\n小藪\n春日",
      isPush: false
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
      const vm = this
      vm.isPush = true;
      document.getElementById("dice").classList.remove("idoling")
      document.getElementById("dice").classList.remove("rolling")
      document.getElementById("dice").classList.add("rolling")
      setTimeout(this.updateMember, 1000);
      setTimeout(function(){
        document.getElementById("dice").classList.remove("rolling")
        vm.isPush = false;
      }, 3000);
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
    margin: 0 auto 100px;
    width: 100%;
  }
  *{
    margin:0;
    padding:0;
  }
  textarea{
    height: 300px;
    width: 300px;
    margin: 0 auto;
    font-size: 20px;
    padding: 10px;
  }
  .rolling{
    animation:kurukuru 3s;
    transform-origin:0 0 -100px;
  }
  .idoling{
    animation:idol 3s;
    transform-origin:0 30px -110px;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  .throw {
    width: 300px;
    margin: 40px auto;
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
  h1{
    text-align: center;
    color: #fff;
    font-size: 30px;
    padding: 40px 0;
    span{
      border: 1px solid #fff;
      padding: 10px;
      border-radius: 2px;
      margin: 2px;
      &:nth-child(1){
        background-color: #5165A7;
      }
      &:nth-child(2){
        background-color: #C62A3A;
      }
      &:nth-child(3){
        background-color: #439E53;
      }
      &:nth-child(4){
        background-color: #993F85;
      }
      &:nth-child(5){
        background-color: #EADC3D;
      }
      &:nth-child(6){
        background-color: #fff;
        color: #B03D2B;
      }
    }
  }

  .hole{
    background-color: brown;
    border-radius: 10000px;
    height: 600px;
    width: 600px;
    margin: 0 auto;
    border: 10px solid #ab8f2c;
    position: relative;
  }
  p.description{
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    padding-bottom: 10px;
    small
    {
      font-size: 12px;
    }
  }
  .footer_txt{
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    padding-bottom: 10px;
    margin-top: 20px;
    a{
      color: #fff;
    }
    small
    {
      font-size: 12px;
    }
  }
  ol{
    list-style:none;
    margin:200px auto;
    width: 100px;
    position:absolute;
    top: 70px;
    left: 254px;
    transform-style:preserve-3d;
    li{
      width:100px;
      height:100px;
      position:absolute;
      background:#333;
      transform:rotate3d(0,0,0,180deg);
      .name{
        font-size:25px;
        color:#fff;
        text-align:center;
        line-height:2.25;
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
  .tweet{
    text-align: center;
    margin-top: 30px;
  }
  @keyframes kurukuru{
    0% {
      transform:rotateX(0turn) rotateY(0turn) rotateZ(0turn);
      top: 100vh;
      left: 100vw;
    }
    100% {
      transform:rotateX(7turn) rotateY(1turn) rotateZ(0turn);
      top: 70px;
      left: 254px;
    }
  }
  @keyframes idol{
    0% {
      transform:rotateX(0turn) rotateY(0turn) rotateZ(0turn);
    }
    100% {
      transform:rotateX(1turn) rotateY(0turn) rotateZ(0turn);
    }
  }

  @media screen and (max-width:768px){
    /*300px以上で適用する内容*/
    .hole{
      width: 300px;
      height: 300px;
    }
    #dice{
      top: -82px;
      left: 100px;
    }
    p.description{
      font-size: 16px;
    }
    @keyframes kurukuru{
      0% {
        transform:rotateX(0turn) rotateY(0turn) rotateZ(0turn);
        top: 80vh;
        left: 150vw;
      }
      100% {
        transform:rotateX(7turn) rotateY(1turn) rotateZ(0turn);
        top: -82px;
        left: 100px;
      }
    }
  }
</style>