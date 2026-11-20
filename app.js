(() => {
  const config = window.TECHNICAL_ERA1_CONFIG || {};
  const grid = document.getElementById('videoGrid');
  const status = document.getElementById('videoStatus');
  const search = document.getElementById('videoSearch');
  const modal = document.getElementById('videoModal');
  const modalInner = document.getElementById('modalInner');
  let videos = [];

  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('menuToggle').addEventListener('click', () => document.getElementById('mainNav').classList.toggle('open'));
  document.querySelectorAll('#mainNav a').forEach(a => a.addEventListener('click', () => document.getElementById('mainNav').classList.remove('open')));
  document.getElementById('modalClose').addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  search.addEventListener('input', () => renderVideos(search.value.trim().toLowerCase()));

  function closeModal() { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); modalInner.innerHTML = ''; }
  function playVideo(id) {
    modalInner.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
    modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false');
  }
  function escapeHTML(value = '') { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function renderVideos(filter = '') {
    const list = videos.filter(v => `${v.title} ${v.description}`.toLowerCase().includes(filter));
    if (!list.length) { grid.innerHTML = '<div class="video-placeholder"><h3>No matching videos</h3><p>Try another search term.</p></div>'; return; }
    grid.innerHTML = list.map(v => `<article class="video-card"><button class="thumb" data-video="${escapeHTML(v.id)}" aria-label="Play ${escapeHTML(v.title)}"><img src="${escapeHTML(v.thumbnail)}" alt="${escapeHTML(v.title)}" loading="lazy"><span class="thumb-play">▶</span></button><div class="video-card-body"><div class="video-date">${new Date(v.date).toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'})}</div><h3>${escapeHTML(v.title)}</h3><p>${escapeHTML(v.description || 'Watch this tutorial from Technical ERA1.').slice(0,150)}${v.description && v.description.length > 150 ? '…' : ''}</p><button class="watch-link" data-video="${escapeHTML(v.id)}">Watch tutorial <b>↗</b></button></div></article>`).join('');
    grid.querySelectorAll('[data-video]').forEach(el => el.addEventListener('click', () => playVideo(el.dataset.video)));
  }
  async function loadVideos() {
    const key = config.youtubeApiKey;
    if (!key || key.includes('PASTE_')) return;
    status.textContent = 'Loading latest uploads from YouTube…';
    try {
      const base = 'https://www.googleapis.com/youtube/v3/';
      const channelURL = `${base}channels?part=contentDetails&forHandle=${encodeURIComponent(config.channelHandle || 'technicalskiil')}&key=${encodeURIComponent(key)}`;
      const channelResponse = await fetch(channelURL);
      const channelData = await channelResponse.json();
      if (!channelResponse.ok) throw new Error(channelData.error?.message || 'Could not access the YouTube channel.');
      const channel = channelData.items?.[0];
      if (!channel) throw new Error('Channel not found. Check the channel handle in config.js.');
      const playlist = channel.contentDetails.relatedPlaylists.uploads;
      const playlistURL = `${base}playlistItems?part=snippet,contentDetails&maxResults=24&playlistId=${encodeURIComponent(playlist)}&key=${encodeURIComponent(key)}`;
      const playlistResponse = await fetch(playlistURL);
      const playlistData = await playlistResponse.json();
      if (!playlistResponse.ok) throw new Error(playlistData.error?.message || 'Could not load channel videos.');
      videos = (playlistData.items || []).map(item => {
        const s = item.snippet;
        return { id: item.contentDetails.videoId, title: s.title, description: s.description, date: s.publishedAt, thumbnail: s.thumbnails.maxres?.url || s.thumbnails.high?.url || s.thumbnails.medium?.url };
      }).filter(v => v.id && v.thumbnail);
      status.textContent = `${videos.length} recent videos loaded from @${config.channelHandle || 'technicalskiil'}`;
      renderVideos(search.value.trim().toLowerCase());
    } catch (err) {
      status.textContent = `YouTube connection: ${err.message}`;
      grid.innerHTML = `<div class="video-placeholder"><h3>Videos could not be loaded</h3><p>${escapeHTML(err.message)} Check your API key, quota and channel handle in <code>config.js</code>.</p><a class="btn btn-outline" href="https://www.youtube.com/@technicalskiil" target="_blank" rel="noreferrer">Open YouTube channel ↗</a></div>`;
    }
  }
  loadVideos();
})();
