import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'SVIS.YV Шиномонтаж'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#050505',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '16px solid #39FF14',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          {/* Logo Emblem */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 200,
              height: 200,
              borderRadius: 100,
              border: '12px solid #39FF14',
              backgroundColor: '#0a0a0a',
            }}
          >
            <div
              style={{
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 130,
                height: 130,
                borderRadius: 65,
                border: '8px dashed rgba(57, 255, 20, 0.7)',
              }}
            />
            <span
              style={{
                fontSize: 64,
                fontWeight: 900,
                color: '#39FF14',
                fontFamily: 'sans-serif',
                letterSpacing: '5px',
              }}
            >
              YV
            </span>
          </div>

          {/* Text Right of Emblem */}
          <div
            style={{
              display: 'flex',
              fontSize: 120,
              fontWeight: 900,
              color: '#ffffff',
              fontFamily: 'sans-serif',
              letterSpacing: '5px',
            }}
          >
            SVIS.<span style={{ color: '#39FF14' }}>YV</span>
          </div>
        </div>
        
        {/* Caption */}
        <div 
          style={{ 
            marginTop: 70, 
            display: 'flex',
            fontSize: 36, 
            color: '#a3a3a3', 
            fontFamily: 'sans-serif', 
            letterSpacing: '2px', 
            textTransform: 'uppercase',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            padding: '20px 40px',
            borderRadius: '50px',
            backgroundColor: '#111'
          }}
        >
          Професійний Шиномонтаж та Зберігання Шин
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
