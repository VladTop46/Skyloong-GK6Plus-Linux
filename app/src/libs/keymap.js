const KeyCode = { 
 KEY_NONE                :  0x00	
, STD_KEY_A              :  0x04
, STD_KEY_B              :  0x05
, STD_KEY_C              :  0x06
, STD_KEY_D              :  0x07
, STD_KEY_E              :  0x08
, STD_KEY_F              :  0x09
, STD_KEY_G              :  0x0A
, STD_KEY_H              :  0x0B
, STD_KEY_I              :  0x0C
, STD_KEY_J              :  0x0D
, STD_KEY_K              :  0x0E
, STD_KEY_L              :  0x0F
, STD_KEY_M              :  0x10
, STD_KEY_N              :  0x11
, STD_KEY_O              :  0x12
, STD_KEY_P              :  0x13
, STD_KEY_Q              :  0x14
, STD_KEY_R              :  0x15
, STD_KEY_S              :  0x16
, STD_KEY_T              :  0x17
, STD_KEY_U              :  0x18
, STD_KEY_V              :  0x19
, STD_KEY_W              :  0x1A
, STD_KEY_X              :  0x1B
, STD_KEY_Y              :  0x1C
, STD_KEY_Z              :  0x1D
, STD_KEY_1              :  0x1E
, STD_KEY_2              :  0x1F
, STD_KEY_3              :  0x20
, STD_KEY_4              :  0x21
, STD_KEY_5              :  0x22
, STD_KEY_6              :  0x23
, STD_KEY_7              :  0x24
, STD_KEY_8              :  0x25
, STD_KEY_9              :  0x26
, STD_KEY_0              :  0x27
, STD_KEY_RETURN         :  0x28
, STD_KEY_ESCAPE         :  0x29
, STD_KEY_BACKSPACE      :  0x2A
, STD_KEY_TAB            :  0x2B
, STD_KEY_SPACE          :  0x2C
, STD_KEY_SUBTRACT       :  0x2D
, STD_KEY_ADD            :  0x2E
, STD_KEY_SQUARE_BRACKET_LEFT :  0x2F
, STD_KEY_SQUARE_BRACKET_RIGHT :  0x30
, STD_KEY_BACKSLASH      :  0x31
, STD_KEY_EUROPE1        :  0x32
, STD_KEY_SEMICOLON      :  0x33
, STD_KEY_QUOTATION_SIGN :  0x34
, STD_KEY_WAVE           :  0x35
, STD_KEY_COMMA          :  0x36
, STD_KEY_FULLSTOP       :  0x37
, STD_KEY_SLASH          :  0x38
, STD_KEY_CAPITAL        :  0x39
, STD_KEY_F1             :  0x3A
, STD_KEY_F2             :  0x3B
, STD_KEY_F3             :  0x3C
, STD_KEY_F4             :  0x3D
, STD_KEY_F5             :  0x3E
, STD_KEY_F6             :  0x3F
, STD_KEY_F7             :  0x40
, STD_KEY_F8             :  0x41
, STD_KEY_F9             :  0x42
, STD_KEY_F10            :  0x43
, STD_KEY_F11            :  0x44
, STD_KEY_F12            :  0x45
, STD_KEY_SNAPSHOT       :  0x46
, STD_KEY_SCROLL         :  0x47
, STD_KEY_CANCEL         :  0x48
, STD_KEY_PAUSE          :  0x48
, STD_KEY_INSERT         :  0x49
, STD_KEY_HOME           :  0x4A
, STD_KEY_PAGEUP         :  0x4B
, STD_KEY_DELETE         :  0x4C
, STD_KEY_END            :  0x4D
, STD_KEY_PAGEDOWN       :  0x4E
, STD_KEY_RIGHT          :  0x4F
, STD_KEY_LEFT           :  0x50
, STD_KEY_DOWN           :  0x51
, STD_KEY_UP             :  0x52
, STD_KEY_NUMLOCK        :  0x53
, STD_KEY_NUMPAD_DIVIDE  :  0x54
, STD_KEY_NUMPAD_MULTIPLY :  0x55
, STD_KEY_NUMPAD_SUBTRACT :  0x56
, STD_KEY_NUMPAD_ADD     :  0x57
, STD_KEY_NUMPAD_ENTER   :  0x58
, STD_KEY_NUMPAD1        :  0x59
, STD_KEY_NUMPAD2        :  0x5A
, STD_KEY_NUMPAD3        :  0x5B
, STD_KEY_NUMPAD4        :  0x5C
, STD_KEY_NUMPAD5        :  0x5D
, STD_KEY_NUMPAD6        :  0x5E
, STD_KEY_NUMPAD7        :  0x5F
, STD_KEY_NUMPAD8        :  0x60
, STD_KEY_NUMPAD9        :  0x61
, STD_KEY_NUMPAD0        :  0x62
, STD_KEY_NUMPAD_FULLSTOP :  0x63
, STD_KEY_QUROPE2        :  0x64
, STD_KEY_APP            :  0x65
, STD_KEY_KEYBOARD_POWER :  0x66
, STD_KEY_NUMPAD_EQUAL_SIGN :  0x67
, STD_KEY_F13            :  0x68
, STD_KEY_F14            :  0x69
, STD_KEY_F15            :  0x6A
, STD_KEY_F16            :  0x6B
, STD_KEY_F17            :  0x6C
, STD_KEY_F18            :  0x6D
, STD_KEY_F19            :  0x6E
, STD_KEY_F20            :  0x6F
, STD_KEY_F21            :  0x70
, STD_KEY_F22            :  0x71
, STD_KEY_F23            :  0x72
, STD_KEY_F24            :  0x73
, STD_KEY_KEYBOARD_EXECUTE :  0x74
, STD_KEY_KEYBOARD_HELP  :  0x75
, STD_KEY_KEYBOARD_MENU  :  0x76
, STD_KEY_KEYBOARD_SELECT :  0x77
, STD_KEY_KEYBOARD_STOP  :  0x78
, STD_KEY_KEYBOARD_AGAIN :  0x79
, STD_KEY_KEYBOARD_UNDO  :  0x7A
, STD_KEY_KEYBOARD_CUT   :  0x7B
, STD_KEY_KEYBOARD_COPY  :  0x7C
, STD_KEY_KEYBOARD_PASTE :  0x7D
, STD_KEY_KEYBOARD_FIND  :  0x7E
, STD_KEY_KEYBOARD_MUTE  :  0x7F
, STD_KEY_KEYBOARD_VOLUMEUP :  0x80
, STD_KEY_KEYBOARD_VOLUMEDOWN :  0x81
, STD_KEY_KEYBOARD_CAPITAL :  0x82
, STD_KEY_KEYBOARD_NUMLOCK :  0x83
, STD_KEY_KEYBOARD_SCROLL :  0x84
, STD_KEY_NUMPAD_COMMA   :  0x85
, STD_KEY_KEYBOARD_QUEAL_SIGN :  0x86
, STD_KEY_KEYBOARD_RO    :  0x87
, STD_KEY_KEYBOARD_KATAKANA_HIRAGANA :  0x88
, STD_KEY_KEYBOARD_YEN   :  0x89
, STD_KEY_KEYBOARD_HENKAN :  0x8A
, STD_KEY_KEYBOARD_MUHENKAN :  0x8B
, STD_KEY_KEYBOARD_PC9800_COMMA :  0x8C
, STD_KEY_KEYBOARD_INTL7 :  0x8D
, STD_KEY_KEYBOARD_INTL8 :  0x8E
, STD_KEY_KEYBOARD_INTL9 :  0x8F
, STD_KEY_KEYBOARD_LANG1 :  0x90
, STD_KEY_KEYBOARD_LANG2 :  0x91
, STD_KEY_KEYBOARD_LANG3 :  0x92
, STD_KEY_KEYBOARD_LANG4 :  0x93
, STD_KEY_KEYBOARD_LANG5 :  0x94
, STD_KEY_KEYBOARD_LANG6 :  0x95
, STD_KEY_KEYBOARD_LANG7 :  0x96
, STD_KEY_KEYBOARD_LANG8 :  0x97
, STD_KEY_KEYBOARD_LANG9 :  0x98
, STD_KEY_KEYBOARD_ALTERNATE_ERASE :  0x99
, STD_KEY_KEYBOARD_SYSREQ :  0x9A
, STD_KEY_KEYBOARD_CANCEL :  0x9B
, STD_KEY_KEYBOARD_CLEAR :  0x9C
, STD_KEY_KEYBOARD_PRIOR :  0x9D
, STD_KEY_KEYBOARD_RETURN :  0x9E
, STD_KEY_KEYBOARD_SEPARATOR :  0x9F
, STD_KEY_KEYBOARD_OUT   :  0xA0
, STD_KEY_KEYBOARD_OPER  :  0xA1
, STD_KEY_KEYBOARD_CLEAR_AGAIN :  0xA2
, STD_KEY_KEYBOARD_CRSEL_PROPS :  0xA3
, STD_KEY_KEYBOARD_EXSEL :  0xA4
 , STD_KEY_LCONTROL:0xE0
 ,STD_KEY_LSHIFT:0xE1
 ,STD_KEY_LMENU:0xE2
 ,STD_KEY_LWIN:0xE3
 ,STD_KEY_RCONTROL:0xE4
 ,STD_KEY_RSHIFT:0xE5
 ,STD_KEY_RMENU:0x65
 ,STD_KEY_RWIN:0xE7
}
const KeyName = {
    STD_KEY_BACKSPACE: '"Backspace"',
        STD_KEY_TAB: '"Tab"',
        STD_KEY_RETURN: '"Enter"',
        STD_KEY_LCONTROL: '"Ctrl"',
        STD_KEY_LSHIFT: '"Shift"',
        STD_KEY_LMENU:'"Alt"', 
        STD_KEY_PAUSE: '"Pause"',
        STD_KEY_CAPITAL: '"Caps Lock"',
        STD_KEY_ESCAPE: '"Esc"',
        STD_KEY_SPACE: '"Space"',
        STD_KEY_PAGEUP: '"Page Up"',
        STD_KEY_PAGEDOWN: '"Page Down"',
        STD_KEY_END: '"End"',
        STD_KEY_HOME: '"Home"',
        STD_KEY_LEFT: '"Left"',
        STD_KEY_UP: '"Up"',
        STD_KEY_RIGHT: '"Right"',
        STD_KEY_DOWN: '"Down"',
        STD_KEY_SNAPSHOT: '"Print Screen"',
        STD_KEY_INSERT: '"Insert"',
        STD_KEY_DELETE: '"Delete"',
        STD_KEY_0: '"0"',
        STD_KEY_1: '"1"',
        STD_KEY_2: '"2"',
        STD_KEY_3: '"3"',
        STD_KEY_4: '"4"',
        STD_KEY_5: '"5"',
        STD_KEY_6: '"6"',
        STD_KEY_7: '"7"',
        STD_KEY_8: '"8"',
        STD_KEY_9: '"9"',
        STD_KEY_A: '"A"',
        STD_KEY_B: '"B"',
        STD_KEY_C: '"C"',
        STD_KEY_D: '"D"',
        STD_KEY_E: '"E"',
        STD_KEY_F: '"F"',
        STD_KEY_G: '"G"',
        STD_KEY_H: '"H"',
        STD_KEY_I: '"I"',
        STD_KEY_J: '"J"',
        STD_KEY_K: '"K"',
        STD_KEY_L: '"L"',
        STD_KEY_M: '"M"',
        STD_KEY_N: '"N"',
        STD_KEY_O: '"O"',
        STD_KEY_P: '"P"',
        STD_KEY_Q: '"Q"',
        STD_KEY_R: '"R"',
        STD_KEY_S: '"S"',
        STD_KEY_T: '"T"',
        STD_KEY_U: '"U"',
        STD_KEY_V: '"V"',
        STD_KEY_W: '"W"',
        STD_KEY_X: '"X"',
        STD_KEY_Y: '"Y"',
        STD_KEY_Z: '"Z"',
        STD_KEY_LWIN: '"Left Win"',
         STD_KEY_RWIN: '"Right Win"',
        STD_KEY_NUMPAD0: '"Num 0"',
        STD_KEY_NUMPAD1: '"Num 1"',
        STD_KEY_NUMPAD2: '"Num 2"',
        STD_KEY_NUMPAD3: '"Num 3"',
        STD_KEY_NUMPAD4: '"Num 4"',
        STD_KEY_NUMPAD5: '"Num 5"',
        STD_KEY_NUMPAD6: '"Num 6"',
        STD_KEY_NUMPAD7: '"Num 7"',
        STD_KEY_NUMPAD8: '"Num 8"',
        STD_KEY_NUMPAD9: '"Num 9"',
        STD_KEY_NUMPAD_MULTIPLY: '"Num *"',
        STD_KEY_NUMPAD_ADD: '"Num +"',
        STD_KEY_NUMPAD_SUBTRACT: '"Num -"',
        STD_KEY_NUMPAD_FULLSTOP: '"Num ."',
        STD_KEY_NUMPAD_DIVIDE: '"Num /"',
        STD_KEY_F1: '"F1"',
        STD_KEY_F2: '"F2"',
        STD_KEY_F3: '"F3"',
        STD_KEY_F4: '"F4"',
        STD_KEY_F5: '"F5"',
        STD_KEY_F6: '"F6"',
        STD_KEY_F7: '"F7"',
        STD_KEY_F8: '"F8"',
        STD_KEY_F9: '"F9"',
        STD_KEY_F10: '"F10"',
        STD_KEY_F11: '"F11"',
        STD_KEY_F12: '"F12"',
        STD_KEY_NUMLOCK: '"Num Lock"',
        STD_KEY_SCROLL: '"Scroll Lock"',
        STD_KEY_RSHIFT:'"Right Shift"',
        STD_KEY_RCONTROL: '"Right Ctrl"',
        STD_KEY_RMENU: '"Menu"',
        STD_KEY_SEMICOLON: '";"',
        STD_KEY_ADD: '"="',
        STD_KEY_COMMA: '","',
        STD_KEY_SUBTRACT: '"-"',
        STD_KEY_FULLSTOP: '"."',
        STD_KEY_SLASH: '"/"',
        STD_KEY_WAVE: '"`"',
        STD_KEY_SQUARE_BRACKET_LEFT: '"["',
        STD_KEY_BACKSLASH: '"\\"',
        STD_KEY_SQUARE_BRACKET_RIGHT: '"]"',
        STD_KEY_QUOTATION_SIGN: '"\'"'
    }
  function  getKeyName(code){
        return KeyName[Object.keys(KeyCode).find(k=>KeyCode[k]==code)];
    }
    function getKeyCode(name){
        return KeyCode[Object.keys(KeyName).find(k=>KeyName[k]==name)];
    }
module.exports = {
    KeyCode,
    KeyName,
    getKeyName,
    getKeyCode
}

if(!module.parent){
    console.log(getKeyCode('"="'));
}