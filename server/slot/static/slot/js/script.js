const APP_ID = '8c7fef9122c744f3a1bd799128c15981';
const CHANNEL = document.getElementById('channel').innerText;
const TOKEN = document.getElementById('token').innerText;
const uid = document.getElementById('uid').innerText;

const client = AgoraRTC.createClient({mode: 'rtc', codec: 'vp8'})

let localTracks = []
let remoteUsers = {}

let displayUserJoined = async (user, mediaType) => {
    remoteUsers[user.uid] = user

    await client.subscribe(user, mediaType)

    if(mediaType=='video') {
        let player = document.getElementById(`user-container-${user.uid}`)
        if(player != null) {
            console.log('qwerty')
            player.remove()
        }

        player = `<div class="video-container" id="user-container-${user.uid}">
                        <div class="user-name-section"><span id="user-name"></span></div>
                        <div class="video-player" id="user-${user.uid}"></div>
                    </div>`
        
        document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)

        user.videoTrack.play(`user-${user.uid}`)
    }

    if(mediaType=='audio') {
        user.audioTrack.play()
    }
}

let hideUserLeft = async(user) => {
    delete remoteUsers[user.uid]
    document.getElementById(`user-container-${user.uid}`).remove()
}

let displayLocalStream = async () => {
    client.on('user-published', displayUserJoined)
    client.on('user-left', hideUserLeft)

    let temp = await client.join(APP_ID, CHANNEL, TOKEN, uid)

    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()

    let player = `<div class="video-container" id="user-container-${uid}">
                    <div class="user-name-section"><span id="user-name"></span></div>
                    <div class="video-player" id="user-${uid}"></div>
                </div>`
    
    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)

    localTracks[1].play(`user-${uid}`)

    await client.publish([localTracks[0], localTracks[1]])
}

displayLocalStream();

let leaveCall = async () => {
    for(let i=0; i<localTracks.length; i++) {
        localTracks[i].stop();
        localTracks[i].close();
    }

    await client.leave();

    window.open('/admin', '_self')
}

document.getElementById('leave-btn').addEventListener('click', leaveCall)

let toggleCamera = async (e) => {
    if(localTracks[1].muted) {
        await localTracks[1].setMuted(false)
        e.target.style.backgroundColor = '#fff';
    }
    else {
        await localTracks[1].setMuted(true)
        e.target.style.backgroundColor = '#ff5050'
    }
}

document.getElementById('camera-btn').addEventListener('click', toggleCamera)

let toggleMic = async (e) => {
    if(localTracks[0].muted) {
        await localTracks[0].setMuted(false)
        e.target.style.backgroundColor = '#fff';
    }
    else {
        await localTracks[0].setMuted(true)
        e.target.style.backgroundColor = '#ff5050'
    }
}

document.getElementById('mic-btn').addEventListener('click', toggleMic)
