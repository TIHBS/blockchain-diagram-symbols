for f in "$@"
do
    y=${f%.pdf}
    z=${y#../}
    pdfimages -all -p ../$z.pdf $z
done