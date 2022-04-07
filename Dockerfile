FROM amd64/ubuntu:20.04

RUN apt-get update && \
    apt-get install -y build-essential  && \
    apt-get install -y wget && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN apt-get update 

RUN apt-get install -y python3
RUN export PATH=”$PATH:/usr/local/bin/python
RUN python3 --version

RUN apt-get install -y build-essential

RUN apt-get -y install python3-pip

ENV CONDA_DIR /opt/conda

RUN wget --quiet https://repo.anaconda.com/miniconda/Miniconda3-py38_4.10.3-Linux-x86_64.sh -O ~/miniconda.sh && \
    /bin/bash ~/miniconda.sh -b -p /opt/conda

ENV PATH=$CONDA_DIR/bin:$PATH

COPY requirements.txt requirements.txt


RUN conda install -c conda-forge arm_pyart
RUN conda install -c conda-forge cartopy

RUN apt-get update
RUN apt-get install -y libsm6 libxext6 libxrender-dev
RUN pip install opencv-python


RUN python3 -m pip install -r requirements.txt




RUN mkdir /msvc-nasa-python

WORKDIR /msvc-nasa-python

COPY . .
USER root
RUN cd $HOME
RUN touch .netrc
RUN echo "machine urs.earthdata.nasa.gov login vavish2097 password Vaibhav_9856" >> .netrc
#RUN chmod 0600 .netrc
RUN touch .urs_cookies

#CMD ["python3" "-u" "manage.py" "runserver" "0.0.0.0:19036"]