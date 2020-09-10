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
    //自定义
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，不能出现空格']
    })
})