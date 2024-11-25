require 'bundler/setup'
require 'sinatra'
require 'json'
require 'open3'
require 'net/http'
require 'uri'

set :bind, '0.0.0.0'

#SS Development - kod-onizleme.com.tr
post '/execute' do
  content_type :json

  request_data = JSON.parse(request.body.read)
  ruby_code = request_data["code"]

  begin
    stdout, stderr, status = Open3.capture3("ruby", "-e", ruby_code)
    if status.success?
      { output: stdout }.to_json
    else
      { output: stderr }.to_json
    end
  rescue => e
    { output: "Hata: #{e.message}" }.to_json
  end
end


post '/execute_cpp' do
  content_type :json

  request_data = JSON.parse(request.body.read)
  cpp_code = request_data["code"]

 
  File.open("temp.cpp", "w") do |file|
    file.puts(cpp_code)
  end

  #SS Development - kod-onizleme.com.tr
  begin
  
    compile_command = "g++ temp.cpp -o temp_program"
    compile_stdout, compile_stderr, compile_status = Open3.capture3(compile_command)

    if compile_status.success?
      
      run_command = "./temp_program"
      run_stdout, run_stderr, run_status = Open3.capture3(run_command)

      if run_status.success?
        { output: run_stdout }.to_json
      else
        { output: run_stderr }.to_json
      end
    else
      { output: compile_stderr }.to_json
    end
  rescue => e
    { output: "Hata: #{e.message}" }.to_json
  end
end

#SS Development - kod-onizleme.com.tr
get '/' do
  erb :index
end

get '/cpponizleme' do
  erb :cpponizleme
end

get '/htmlonizleme' do
  erb :htmlonizleme
end

get '/kullanimkosullarivegizlilikpolitikasi' do
  erb :kullanimkosullarivegizlilikpolitikasi
end

set :public_folder, 'public'


Thread.new do
  loop do
    begin
      uri = URI("https://www.kod-onizleme.com.tr/")
      Net::HTTP.get(uri)
      puts "Self-ping gönderildi!"
    rescue => e
      puts "Self-ping başarısız: #{e.message}"
    end
    sleep(300)
  end
end
#SS Development - kod-onizleme.com.tr