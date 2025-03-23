!macro customInstall
   FileOpen $1 "$INSTDIR\language.txt" w
    ${If} $1 != ""
        FileWrite $1 "$LANGUAGE"  
        FileClose $1
    ${EndIf}
!macroend