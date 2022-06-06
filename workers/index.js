addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const corsHeaders = {
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'GET',
  'Access-Control-Allow-Origin': '*',
}

async function handleRequest(request) {
  return new Response(await WEBSITES.get('results'), { headers: corsHeaders })
}

addEventListener('scheduled', event => {
  event.waitUntil(handleSchedule(event.scheduledTime))
})

const websites = [
  'https://www.cloudflare.com',
  'https://www.tatlead.com',
  'http://www.doesnotexistslol.com'
]

async function handleSchedule(scheduledTime) {
  await fetchWebsites()
}

/**
 * Fetch websites status
 */
async function fetchWebsites() {
  const results = await Promise.all(websites.map(x => fetchWebsite(x)))

  await WEBSITES.put('results', JSON.stringify(results))
}

async function fetchWebsite(url) {
  const response = await fetch(url)

  return {
    url: url,
    ok: response.ok,
    status: response.status,
    time: new Date().getTime()
  }
}
