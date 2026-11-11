from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from pathlib import Path
p=Path(__file__).resolve().parents[1]/'public/Rewan_Mohamed_Professional_Profile.pdf'
fonts=[('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf','DejaVu'),('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf','DejaVuBold')]
for f,name in fonts:
 if Path(f).exists(): pdfmetrics.registerFont(TTFont(name,f))
c=canvas.Canvas(str(p),pagesize=A4)
W,H=A4
dark=HexColor('#163D31'); sage=HexColor('#667E6C'); gold=HexColor('#AF936B')
c.setFillColor(HexColor('#F9FAF5')); c.rect(0,0,W,H,fill=1,stroke=0)
c.setFillColor(dark);c.rect(0,H-180,W,180,fill=1,stroke=0)
c.setFillColor(HexColor('#DCC7AA'));c.circle(W-65,H-82,54,fill=1,stroke=0)
c.setFillColor(dark); c.setFont('DejaVuBold',23);c.drawCentredString(W-65,H-90,'RM')
c.setFillColor(HexColor('#FFFFFF'));c.setFont('DejaVuBold',30);c.drawString(42,H-67,'Rewan Mohamed')
c.setFont('DejaVu',12);c.drawString(43,H-93,'Speech, Child Development & Behavior Support')
c.setFont('DejaVu',10);c.setFillColor(HexColor('#DAE6DA'));c.drawString(43,H-125,'Egypt  |  +20 100 165 9150')
c.drawString(43,H-144,'rewanmohamed040@gmail.com')

def heading(text,y):
 c.setFillColor(dark);c.setFont('DejaVuBold',15);c.drawString(42,y,text)
 c.setStrokeColor(gold);c.setLineWidth(1.2);c.line(42,y-8,W-42,y-8)
 return y-31

def rows(items,y,sz=10,leading=19):
 c.setFont('DejaVu',sz);c.setFillColor(HexColor('#465B50'))
 for t in items:
  c.drawString(48,y,'- '+t);y-=leading
 return y

y=H-215
y=heading('Professional Overview',y)
y=rows(['Child-centered speech, communication and developmental skills support.', 'Individualized activities, practical goals and partnership with families.', 'Online and in-person session inquiries available.'],y)
y-=18
y=heading('Areas of Support',y)
y=rows(['Speech and communication  |  Speech and language delay', 'Behavior modification  |  Child skills development', 'Learning difficulties  |  Attention and focus  |  Family guidance'],y)
y-=18
y=heading('Academic Education',y)
y=rows(['Bachelor of Social Work - Benha University (2026)'],y)
y-=18
y=heading('Selected Professional Training',y)
y=rows(['Professional Diploma in Learning Difficulties - ABQST (2024)', 'Speech Specialist Preparation - Ain Shams University (300 hours, 2025)', 'Specialized programs in autism, sensory integration and behavior support', 'Practical training at Itqan Center and Al-Horreya Specialized Hospital'],y,9.2)
y-=12
c.setStrokeColor(HexColor('#DCE5DC'));c.line(42,91,W-42,91)
c.setFillColor(sage);c.setFont('DejaVu',8.3)
c.drawString(42,76,'Prepared from supplied CV and professional training certificates. This is not a license to practice.')
c.drawString(42,59,'No personal identification numbers or dates of birth are included in this public summary.')
c.setFillColor(gold);c.setFont('DejaVuBold',9);c.drawRightString(W-42,40,'REWAN MOHAMED  |  2026')
c.save()
print(p,p.stat().st_size)
