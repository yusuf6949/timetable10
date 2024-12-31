!macro customInstall
  ; Create registry entries for file associations
  WriteRegStr HKCR ".khsk" "" "KHSKTimeTable.Document"
  WriteRegStr HKCR "KHSKTimeTable.Document" "" "KHSK TimeTable Document"
  WriteRegStr HKCR "KHSKTimeTable.Document\DefaultIcon" "" "$INSTDIR\${PRODUCT_NAME}.exe,0"
  WriteRegStr HKCR "KHSKTimeTable.Document\shell\open\command" "" '"$INSTDIR\${PRODUCT_NAME}.exe" "%1"'
  
  ; Create registry entries for uninstaller
  WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\${UNINSTALL_APP_KEY}" "DisplayName" "KHSK TimeTable"
  WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\${UNINSTALL_APP_KEY}" "DisplayVersion" "${VERSION}"
  WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\${UNINSTALL_APP_KEY}" "Publisher" "NextHomeLabs"
  WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\${UNINSTALL_APP_KEY}" "URLInfoAbout" "https://kinaawahigh.co.ug"
  WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\${UNINSTALL_APP_KEY}" "HelpLink" "mailto:admin@kinaawahigh.co.ug"
!macroend

!macro customUnInstall
  ; Clean up registry entries
  DeleteRegKey HKCR ".khsk"
  DeleteRegKey HKCR "KHSKTimeTable.Document"
  DeleteRegKey HKCU "Software\KHSK TimeTable"
!macroend