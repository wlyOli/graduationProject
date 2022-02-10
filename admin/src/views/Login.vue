<template>
	<div>
		<el-container  class="login">
			<!-- <el-form class="login-container">
				
			</el-form> -->
			<img src="../assets/egg.jpeg" width="500px" height="400px"/>
			<el-card class="box-card" header='管理员登录'>
				<el-form :model="model"  class="login-form"
						 :rules="rules" ref="model" label-width="100px"
						 @submit.native.prevent = "login">
					  <el-form-item label="用户名" prop="user">
							<el-input type="text" v-model="model.user" name="user"></el-input>
					  </el-form-item>
					  <el-form-item label="密码" prop="password">
							<el-input type="password" v-model="model.password" name="password" autocomplete="off"></el-input>
					  </el-form-item>
					  <el-form-item>
							<el-button type="success" native-type = 'submit'
							 :disabled="!this.model.user||!this.model.password?true:false"
							 @click="checkInfo">登录</el-button>
					  </el-form-item>
				</el-form>
				<div class="forgetPass">忘记密码</div>
				
			</el-card>
			
		</el-container>
		
	</div>
</template>

<script>
  export default {
    data() {
		// 用户名
      var validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        }else if(value.length>6) {
          callback(new Error('请输入6位用户名'));
		}
      };
	  // 密码
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }else if(value.length<8 || value.length>12) {
		  callback(new Error('请输入8-12位密码'));
			
		}
      };
     
      return {
        model: {
		  user:'',
          password: '',
        },
        rules: {
		  user:[
			{ validator: validateUser, trigger: 'blur'}
		  ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
        },
		clickButton:true
      };
    },
    methods: {
	  checkInfo(){
		  // if(){
			  
		  // }
	  },
      async login(){
		  const res = await this.$http.post('login',this.model)
		  console.log('res',res)
		  //存储token关闭之后还有
		  localStorage.token = res.data.token
		  this.$router.push('/Main')
		  this.$message({
		  	type:'success',
		  	message:'登录成功'
		  })
	  }
      
    }
  }
</script>

<style >
	.login{
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 120px;
	}
	.login-container{
		position: relative;
		width: 480px;
		height: 400px;
		border: 1px solid black;
		/*  #EBEEF */
	}
	.box-card {
		width: 350px;
		height: 400px;
		
	}
	.login-form{
		position: relative;	
		margin-top: 30px;
		
	}
	.login-form .el-form-item__label{
		text-align: left;
		
	}
	.login-form .el-form-item__error{
		left: -35px;
	}
	.login-form .el-input__inner{
		width: 100%;
		margin-left: -40px;
		
	}
	.login-form .el-button{
		/* box-sizing: border-box;
		将border和padding包含在width height中 ，使得修改border和padding时宽高不变*/
		width: 210px;
		margin-left: -40px;
		
	}
	.forgetPass{
		float: right;
		margin-right: 40px;
		font-size: 14px;
	}
</style>
