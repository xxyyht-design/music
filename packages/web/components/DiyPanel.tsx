import React from 'react'
import { useSnapshot } from 'valtio'
import uiStates from '@/web/states/uiStates'
import settings from '@/web/states/settings'
import { AnimatePresence, motion } from 'framer-motion'
import { cx, css } from '@emotion/css'

const DiyPanel = () => {
  const { showDiyPanel } = useSnapshot(uiStates)
  const settingsSnap = useSnapshot(settings)

  return (
    <AnimatePresence>
      {showDiyPanel && (
        <motion.div
          initial={{ x: 400, opacity: 0, scale: 0.95 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: 400, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className={cx(
            'mineradio-panel',
            'fixed right-6 top-24 bottom-24 z-50 w-80 overflow-y-auto rounded-2xl p-6',
            css`
              scrollbar-width: none;
              &::-webkit-scrollbar {
                display: none;
              }
            `
          )}
        >
          <div className='mb-6 border-b border-white/10 pb-4'>
            <div className='text-sm font-medium tracking-wider text-white/90'>视觉控制台</div>
            <div className='mt-1 text-[10px] tracking-widest text-white/30 uppercase'>
              MINERADIO VISUALS · DIY MODE
            </div>
          </div>

          <div className='fx-section-label'>毛玻璃材质</div>
          
          <div className='fx-slider'>
            <label>模糊强度</label>
            <input 
              type='range' 
              min='0' 
              max='100' 
              step='1' 
              value={settingsSnap.glassBlur} 
              onChange={(e) => {
                settings.glassBlur = parseInt(e.target.value)
              }}
            />
            <output>{settingsSnap.glassBlur}px</output>
          </div>

          <div className='fx-slider'>
            <label>饱和度</label>
            <input 
              type='range' 
              min='0' 
              max='500' 
              step='1' 
              value={settingsSnap.glassSaturate} 
              onChange={(e) => {
                settings.glassSaturate = parseInt(e.target.value)
              }}
            />
            <output>{settingsSnap.glassSaturate}%</output>
          </div>

          <div className='fx-slider'>
            <label>亮度</label>
            <input 
              type='range' 
              min='0' 
              max='200' 
              step='1' 
              value={settingsSnap.glassBrightness} 
              onChange={(e) => {
                settings.glassBrightness = parseInt(e.target.value)
              }}
            />
            <output>{settingsSnap.glassBrightness}%</output>
          </div>

          <div className='fx-slider'>
            <label>高亮强度</label>
            <input 
              type='range' 
              min='0' 
              max='0.5' 
              step='0.01' 
              value={settingsSnap.glassVeil} 
              onChange={(e) => {
                settings.glassVeil = parseFloat(e.target.value)
              }}
            />
            <output>{Math.round(settingsSnap.glassVeil * 100)}%</output>
          </div>

          <div className='fx-section-label'>核心视觉</div>
          
          <div className='fx-slider'>
            <label>呼吸灯背景</label>
            <input 
              type='range' 
              min='0' 
              max='1' 
              step='1' 
              value={settingsSnap.enableBreathingEffect ? 1 : 0} 
              onChange={(e) => {
                settings.enableBreathingEffect = e.target.value === '1'
              }}
            />
            <output>{settingsSnap.enableBreathingEffect ? 'ON' : 'OFF'}</output>
          </div>

          <div className='fx-slider'>
            <label>动态星空</label>
            <input 
              type='range' 
              min='0' 
              max='1' 
              step='1' 
              value={settingsSnap.enableStarrySky ? 1 : 0} 
              onChange={(e) => {
                settings.enableStarrySky = e.target.value === '1'
              }}
            />
            <output>{settingsSnap.enableStarrySky ? 'ON' : 'OFF'}</output>
          </div>

          <div className='fx-slider'>
            <label>背景图片</label>
            <input 
              type='range' 
              min='0' 
              max='1' 
              step='1' 
              value={settingsSnap.showBackgroundImage ? 1 : 0} 
              onChange={(e) => {
                settings.showBackgroundImage = e.target.value === '1'
              }}
            />
            <output>{settingsSnap.showBackgroundImage ? 'ON' : 'OFF'}</output>
          </div>

          <div className='fx-slider'>
            <label>暗色模式</label>
            <input 
              type='range' 
              min='0' 
              max='1' 
              step='1' 
              value={settingsSnap.theme === 'dark' ? 1 : 0} 
              onChange={(e) => {
                settings.theme = e.target.value === '1' ? 'dark' : 'light'
              }}
            />
            <output>{settingsSnap.theme === 'dark' ? 'DARK' : 'LIGHT'}</output>
          </div>

          <div className='fx-section-label'>歌词控制</div>
          
          <div className='fx-slider'>
            <label>桌面歌词</label>
            <input 
              type='range' 
              min='0' 
              max='1' 
              step='1' 
              value={settingsSnap.showDesktopLyrics ? 1 : 0} 
              onChange={(e) => {
                settings.showDesktopLyrics = e.target.value === '1'
              }}
            />
            <output>{settingsSnap.showDesktopLyrics ? 'ON' : 'OFF'}</output>
          </div>

          <div className='fx-section-label'>智能预设</div>
          <div className='flex flex-wrap gap-2'>
            <button 
              className='rounded-lg border border-white/10 bg-[#00f5d4]/10 px-3 py-2 text-[10px] text-[#00f5d4] transition-all hover:bg-[#00f5d4]/20'
              onClick={() => {
                settings.glassBlur = 40;
                settings.glassSaturate = 220;
                settings.glassBrightness = 90;
                settings.glassVeil = 0.08;
                settings.showBackgroundImage = false;
                settings.enableStarrySky = true;
                settings.enableBreathingEffect = true;
                settings.theme = 'dark';
              }}
            >
              液态星空 (推荐)
            </button>
            <button 
              className='rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[10px] text-white/70 transition-all hover:bg-white/10'
              onClick={() => {
                settings.glassBlur = 12;
                settings.glassSaturate = 100;
                settings.glassBrightness = 100;
                settings.showBackgroundImage = true;
                settings.enableStarrySky = false;
              }}
            >
              经典原生
            </button>
          </div>

          <div className='fx-section-label'>其它设定</div>
          <div className='flex flex-wrap gap-2'>
            <button 
              className='rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[11px] text-white/70 transition-all hover:bg-white/10'
              onClick={() => {
                settings.displayPlaylistsFromNeteaseMusic = !settingsSnap.displayPlaylistsFromNeteaseMusic
              }}
            >
              网易云歌单: {settingsSnap.displayPlaylistsFromNeteaseMusic ? '显示' : '隐藏'}
            </button>
          </div>

          <div className='mt-8 text-center'>
            <button 
              onClick={() => { uiStates.showDiyPanel = false }}
              className='text-[10px] text-white/20 uppercase tracking-widest hover:text-white/50 transition-colors'
            >
              Close Console
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default DiyPanel
