import * as Taro from '@tarojs/taro-h5'
import 'jest-dom/extend-expect'
import { delay } from '../../utils'

describe('toast', () => {
  test('options.title should be String', () => {
    const success = jest.fn()
    const fail = jest.fn()
    const complete = jest.fn()

    expect.assertions(4)
    Taro.showToast({
      // @ts-ignore
      title: 123,
      success,
      fail,
      complete
    })
      .catch(err => {
        const expectErrObj = { errMsg: 'showToast:fail parameter error: parameter.title should be String instead of Number' }
        expect(success.mock.calls.length).toBe(0)
        expect(fail).toHaveBeenCalledWith(expectErrObj)
        expect(complete).toHaveBeenCalledWith(expectErrObj)
        expect(err).toEqual(expectErrObj)
      })
  })

  test('options.duration should be Number', () => {
    const success = jest.fn()
    const fail = jest.fn()
    const complete = jest.fn()

    expect.assertions(4)
    Taro.showToast({
      // @ts-ignore
      duration: null,
      success,
      fail,
      complete
    })
      .catch(err => {
        const expectErrObj = { errMsg: 'showToast:fail parameter error: parameter.duration should be Number instead of Null' }
        expect(success.mock.calls.length).toBe(0)
        expect(fail).toHaveBeenCalledWith(expectErrObj)
        expect(complete).toHaveBeenCalledWith(expectErrObj)
        expect(err).toEqual(expectErrObj)
      })
  })

  test('basic test', async done => {
    const titleContent = 'xxx'
    const success = jest.fn()
    const complete = jest.fn()
    const errObj = { errMsg: 'showToast:ok' }

    Taro.showToast({
      title: titleContent,
      icon: 'success',
      success,
      complete
    })
      .then(res => {
        expect(res).toEqual(errObj)
      })

    const toast: any = document.body.lastChild
    expect(toast.childNodes.length).toBe(2)
    expect(toast).not.toBeVisible()

    const mask = toast.firstChild
    const title = toast.lastChild.lastChild
    // expect(toast.lastChild.firstChild).toHaveTextContent('')
    expect(title).toHaveTextContent(titleContent)

    expect(success).toHaveBeenCalledWith(errObj)
    expect(complete).toHaveBeenCalledWith(errObj)

    await delay(200)
    expect(toast).toBeVisible()
    expect(mask).not.toBeVisible()

    await delay(2000)
    expect(toast).not.toBeVisible()
    done()
  })

  test('should show corresponding icon', () => {
    Taro.showToast({
      title: 'hello',
      icon: 'none'
    })

    const toast: any = document.body.lastChild
    const icon = toast.lastChild.firstChild

    expect(icon).not.toBeVisible()

    Taro.showToast({
      title: 'hello',
      icon: 'loading'
    })

    expect(icon.style.animation).toMatch('taroLoading 1s steps(12, end) infinite')
  })

  test('should show image', () => {
    Taro.showToast({
      title: 'github logo',
      image: '//storage.360buyimg.com/taro-static/static/images/icon_githubf.png',
      icon: 'loading'
    })

    const toast: any = document.body.lastChild
    const icon = toast.lastChild.firstChild
    const background = 'background-image: url(//storage.360buyimg.com/taro-static/static/images/icon_githubf.png)'

    expect(icon).toHaveStyle(background)

    Taro.showToast({ title: 'success' })

    expect(icon).not.toHaveStyle(background)
    // expect(icon).toHaveTextContent('')
  })

  test('should show mask', async done => {
    Taro.showToast({
      title: 'hello',
      mask: true
    })

    const toast: any = document.body.lastChild
    const mask = toast.firstChild

    await delay(200)
    expect(mask).toBeVisible()
    done()
  })

  test('should close after 5 second', async done => {
    Taro.showToast({
      title: 'hello',
      duration: 3000
    })

    const toast = document.body.lastChild

    await delay(2000)
    expect(toast).toBeVisible()
    done()

    await delay(4000)
    expect(toast).not.toBeVisible()
    done()
  })

  test('should hide toast immediately', async done => {
    Taro.showToast({
      title: 'hello',
      duration: 30000
    })

    Taro.hideToast()

    const toast = document.body.lastChild
    await delay(500)

    expect(toast).not.toBeVisible()
    done()
  })
})
