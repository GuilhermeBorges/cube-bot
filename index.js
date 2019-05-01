const GIFTS_MSG_SELECTOR = 'p.message'
const ENERGY_MSG_SELECTOR = '.message-item.tag-106>div'
const MSG_INPUT = 'textarea'
const SEND_MSG_BUTTON = 'btn-send'

function pegaAmiguinhos() {
  const energy = Array.from(document.querySelectorAll(ENERGY_MSG_SELECTOR))
  const gifts = Array.from(document.querySelectorAll(GIFTS_MSG_SELECTOR))
  return [].concat(energy, gifts)
    .map(gift => {
      return {
        nome: gift.innerText.split(' sent ')[0],
        gift: gift.innerText.split(' sent ')[1].split('  X')[0],
        quantidade: gift.innerText.split(' sent ')[1].split('  X')[1],
      }
    })
    .reduce((resume, envio) => {
      const { nome, gift, quantidade } = envio
      if (!resume[nome]) resume[nome] = {}
      if (!resume[nome][gift]) resume[nome][gift] = 0
      resume[nome][gift] += Number(quantidade)
      return resume
    }, {})
}

function calculaPontuacao(resumo) {
  const pesos = {
    'Energy': 0.1,
    'I like': 1,
    'Nice': 10,
    'Health Potion': 10,
    'Poo Pile': 50,
    'Funny Bomb': 100,
    'Good Game': 999,
    'Victory': 999,
  }
  return Object.keys(resumo).map(pessoa => {
    return {
      nome: pessoa,
      pontos: Object.keys(resumo[pessoa]).reduce((total, gift) => {
        return total + resumo[pessoa][gift] * pesos[gift]
      }, 0)
    }
  }).sort((a, b) => a.pontos > b.pontos ? -1 : 1)
}

function dizerTop3() {
  const resumo = pegaAmiguinhos()
  const pontuacao = calculaPontuacao(resumo)
  const top1 = pontuacao[0]
  const top2 = pontuacao[1]
  const top3 = pontuacao[2]
  setTimeout(function () {
    dizer(`Primeiro lugar: ${top1.nome} - Pontos: ${top1.pontos}`)
  }, 1000)
  setTimeout(function () {
    dizer(`Segundo lugar: ${top2.nome} - Pontos: ${top2.pontos}`)
  }, 6001)
  setTimeout(function () {
    dizer(`Terceiro lugar: ${top3.nome} - Pontos: ${top3.pontos}`)
  }, 11002)
}

function dizer(texto) {
  var element = document.querySelector(MSG_INPUT)
  var ev = new Event('input', { bubbles: true })
  ev.simulated = true
  element.value = texto
  element.defaultValue = texto
  element.dispatchEvent(ev)
  document.querySelector(SEND_MSG_BUTTON).click()
}
