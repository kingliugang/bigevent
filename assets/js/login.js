$(function () {
    $('#link-reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link-login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })


    // layui 获取 form
    var form = layui.form
    var layer = layui.layer
    //自定义
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，不能出现空格'],
        repwd: function (value) {
            //形参拿到确认密码框的内容
            //需密码框内容
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })


    //监听注册表单提交
    $('#form-reg').on('submit', function (e) {
        e.preventDefault()
        $.post('/api/reguser', { username: $('#form-reg [name=username]').val(), password: $('#form-reg [name=password]').val() }, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功,请登录')
        })
        $('#link-login').click()
    })
    $('#form-login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('res.message')
                }
                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})