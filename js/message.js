!function(){
    var view = document.querySelector('section.message')
    var controller = {
        view: null,
        messageList: null,
        init: function(view){
            this.view = view
            this.messageList = view.querySelector('#messageList')
            this.form = view.querySelector('form')
            this.initAV()
            this.loadMessages()
            this.bindEvents()
        },
        initAV: function(){
            var APP_ID = 'dh0olKhKDVLVEivb4b1e908f-gzGzoHsz'
            var APP_KEY = 'd0xbw8HkM6Ii6xT7pWY9MweD'
            AV.init({appId: APP_ID,appKey: APP_KEY})
        },
        loadMessages: function(){
            var query = new AV.Query('message');
            query.find()
                .then(
                   (messages) => {
                    let array = messages.map((item) => item.attributes )
                    array.forEach((item)=>{
                      let li = document.createElement('li')
                      li.innerText =`${item.name} : ${item.content}`
                      let messageList = document.querySelector('#messageList')
                      this.messageList.append(li)
                    })
                  }
                )
        },
        bindEvents: function(){    
            this.form.addEventListener('submit', (e) => {
                e.preventDefault()
                this.saveMessage()
            })
        },
        saveMessage: function(){
            let myForm = this.form
            let content = myForm.querySelector('input[name=content]').value
            let name = myForm.querySelector('input[name=name]').value
            var Message = AV.Object.extend('message');
            var message = new Message();
            message.save({
                'name':name,
                'content': content
            }).then(function(object) {
                let li = document.createElement('li')
                li.innerText =`${object.attributes.name} : ${object.attributes.content}`
                let messageList = document.querySelector('#messageList')
                messageList.append(li)
                myForm.querySelector('input[name=content]').value = ''
                console.log(object)
            })
        }
    }
    controller.init(view)

}.call()
